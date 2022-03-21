import WaveSurfer from 'wavesurfer.js';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import usePlay from '../../hooks/usePlay';
import { editTrack } from '../../actions/trackActions';
import {
  setSeeking,
  setWaveform,
  loadPlayer,
  setPlayerReady,
} from '../../actions/playerActions';

const Waveform = ({ trackId, size = 'medium' }) => {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.tracks[trackId]);
  const { currentTime, currentTrackId } = useSelector((state) => state.player);
  const containerRef = useRef(null);
  const wavesurfer = useRef();
  const { seekPosition, isPlaying, isSelected } = useSelector(
    (state) => state.player
  );

  const { selectTrack, setPlaying } = usePlay(trackId);

  // Initialize waveform object
  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: containerRef.current,
      backend: 'MediaElement',
      waveColor: size === 'medium' ? '#8c8c8c' : '#dad8d8',
      progressColor: '#f50',
      responsive: true,
      interact: false,
      normalize: true,
      barGap: 1.1,
      barWidth: 2,
      cursorColor: 'transparent',
      barHeight: 1,
      height: size === 'medium' ? 60 : 100,
    });

    dispatch(loadPlayer(trackId));

    const audio = new Audio(track.trackUrl);
    audio.crossOrigin = 'anonymous';

    wavesurfer.current.load(audio, track.peakData);
    wavesurfer.current.setMute(true);
    wavesurfer.current.on('ready', () => {
      // if waveform data doesn't exist, we dispatch data to database
      if (!track.peakData) {
        wavesurfer.current.exportPCM(256, 100, true).then((peakData) => {
          const updated = { ...track, peakData };
          dispatch(editTrack(updated));
        });
      }

      dispatch(setPlayerReady(trackId));
    });

    return () => wavesurfer.current.destroy();
  }, [track.trackUrl]);

  // Send waveform ref to store
  useEffect(() => {
    if (currentTrackId === trackId) {
      dispatch(setWaveform(wavesurfer.current));
    }
  }, [currentTrackId, trackId, wavesurfer.current]);

  useEffect(() => {
    if (currentTrackId === trackId) {
      if (isPlaying) {
        wavesurfer.current.play(currentTime);
      } else {
        wavesurfer.current.pause();
      }
    } else {
      wavesurfer.current.stop();
    }
  }, [isPlaying, currentTrackId, trackId]);

  useEffect(() => {
    if (isPlaying && currentTrackId === trackId) {
      wavesurfer.current.seekTo(seekPosition);
    }
  }, [seekPosition, currentTrackId, trackId]);

  const onSeek = (e) => {
    /**
     * Synthetic mouse event doesn't have offsetX property,
     * so we calculate the difference between e.clientX
     * and containerRef's offsetLeft
     */
    const offsetX =
      e.clientX - containerRef.current.getBoundingClientRect().left;
    const offsetWidth = containerRef.current.offsetWidth;

    // Calculate mouse event position and time to seek to
    const position = offsetX / offsetWidth;
    const time = track?.duration * position;

    dispatch(setSeeking(position, time));
  };

  const onMouseDown = (e) => {
    if (!isSelected) {
      selectTrack(trackId);
    }
    onSeek(e);
    setPlaying();
  };

  return (
    <div
      className="waveform-container"
      ref={containerRef}
      onMouseDown={onMouseDown}
    ></div>
  );
};

export default Waveform;
