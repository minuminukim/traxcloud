import WaveSurfer from 'wavesurfer.js';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import usePlay from '../../hooks/usePlay';
import { editTrack } from '../../actions/trackActions';
import { setSeeking } from '../../actions/playerActions';
import { setPlayerReady, loadPlayer } from '../../actions/playerActions';

const Waveform = ({ trackId, onReady, size = 'medium' }) => {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.tracks[trackId]);
  const { currentTime, currentTrackId } = useSelector((state) => state.player);
  const containerRef = useRef(null);
  const wavesurfer = useRef();
  const { seekPosition, isPlaying } = useSelector((state) => state.player);

  const { selectTrack, setPlaying, isSelected } = usePlay(trackId);

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

    const audio = new Audio(track.trackUrl);
    audio.crossOrigin = 'anonymous';

    // if waveform data doesn't exist, we dispatch data to database
    if (!track.peakData || !track.peakData?.length) {
      wavesurfer.current.load(audio);
      wavesurfer.current.on('waveform-ready', async () => {
        const peakData = await wavesurfer.current.exportPCM(256, 100, true);
        const updated = { ...track, peakData };
        await dispatch(editTrack(updated));
        wavesurfer.current.setMute(true);
        onReady();
        return;
      });
    }

    wavesurfer.current.load(audio, track.peakData);
    wavesurfer.current.on('ready', () => {
      wavesurfer.current.setMute(true);
      // wavesurfer.current.seekTo(seekPosition);
      onReady();
    });

    return () => wavesurfer.current.destroy();
  }, [track.trackUrl]);

  useEffect(() => {
    if (isSelected) {
      wavesurfer.current.seekTo(seekPosition);
      wavesurfer.current.play();
    }
  }, [isSelected, seekPosition]);

  useEffect(() => {
    isSelected
      ? isPlaying
        ? wavesurfer.current.play(currentTime)
        : wavesurfer.current.pause()
      : wavesurfer.current.stop();
  }, [isPlaying, isSelected, currentTime]);

  // useEffect(() => {
  //   if (currentTrackId === trackId) {
  //     if (isPlaying) {
  //       wavesurfer.current.play(currentTime);
  //     } else {
  //       wavesurfer.current.pause();
  //     }
  //   } else {
  //     wavesurfer.current.stop();
  //   }
  // }, [currentTime, isPlaying, currentTrackId, trackId]);

  // useEffect(() => {
  //   if (isPlaying && currentTrackId === trackId) {
  //     wavesurfer.current.seekTo(seekPosition);
  //   }
  // }, [seekPosition, currentTrackId, trackId]);

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
      setPlaying();
    }

    onSeek(e);
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
