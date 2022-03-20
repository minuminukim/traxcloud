import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSeeking,
  setWaveform,
  updateTime,
} from '../../actions/playerActions';
import { loadWaveform, removeWaveform } from '../../actions/queueActions';
import { editTrack } from '../../actions/trackActions';
import usePlay from '../../hooks/usePlay';
import WaveSurfer from 'wavesurfer.js';

const Waveform = ({ trackId, isGlobal = false }) => {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.tracks[trackId]);
  const { currentTime, waveformRef } = useSelector((state) => state.player);
  const containerRef = useRef(null);
  const wavesurfer = useRef(null);
  const { seekPosition, isPlaying } = useSelector((state) => state.player);
  const { selectTrack, isSelected, setPlay } = usePlay(trackId);

  // Initialize waveform object
  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: containerRef.current,
      progressColor: '#f50',
      backend: 'MediaElement',
      responsive: true,
      interact: true,
      normalize: true,
      barGap: 2,
      barWidth: 2,
      cursorColor: 'transparent',
      barHeight: 1,
      // height: 60,
    });

    wavesurfer.current.load(track.trackUrl, track.peakData);

    wavesurfer.current.on('waveform-ready', () => {
      // if waveform data doesn't exist, we dispatch data to database
      if (!track.peakData) {
        wavesurfer.current.exportPCM(256, 100, true).then((peakData) => {
          const updated = { ...track, peakData };
          dispatch(editTrack(updated));
        });
      }
    });

    return () => wavesurfer.current.destroy();
  }, [track.trackUrl]);

  // Sync application time with global wavesurfer object
  useEffect(() => {
    if (!isGlobal) {
      wavesurfer.current.setMute(true);
      // wavesurfer.current.setCurrentTime(currentTime);
      return;
    }

    const onAudioProcess = () => {
      // const globalTime = wavesurfer.current.getCurrentTime();
      dispatch(updateTime(wavesurfer.current.getCurrentTime()));
    };

    wavesurfer.current.on('audioprocess', onAudioProcess);

    return () => wavesurfer.current.un('audioprocess', onAudioProcess);
  }, [isGlobal, dispatch]);

  // Send waveform ref to store
  useEffect(() => {
    if (isGlobal) {
      dispatch(setWaveform(wavesurfer));
    }
  }, [isGlobal]);

  useEffect(() => {
    if (isSelected && isPlaying) {
      wavesurfer.current.play();
    } else {
      wavesurfer.current.pause();
    }
  }, [isSelected, isPlaying, currentTime]);

  useEffect(() => {
    if (isSelected) {
      wavesurfer?.current.seekTo(seekPosition || 0);
    }
  }, [isSelected, seekPosition]);

  const onSeek = (e) => {
    // Synthetic mouse event doesn't have offsetX property
    const offsetX =
      e.clientX - containerRef.current.getBoundingClientRect().left;
    const offsetWidth = containerRef.current.offsetWidth;

    // calculate mouse event position and time to seek to
    const position = offsetX / offsetWidth;
    const time = track?.duration * position;

    dispatch(setSeeking(position, time));
  };

  const onMouseDown = (e) => {
    if (!isSelected) {
      selectTrack();
    }
    onSeek(e);
    setPlay();
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
