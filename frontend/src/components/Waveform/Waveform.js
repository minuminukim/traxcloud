import { useEffect, useState, useRef } from 'react';
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

const Waveform = ({ trackId }) => {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.tracks[trackId]);
  const { currentTime, currentTrackId, waveformRef } = useSelector(
    (state) => state.player
  );
  const containerRef = useRef(null);
  const wavesurfer = useRef();
  const { seekPosition, isPlaying, isSelected } = useSelector(
    (state) => state.player
  );
  const { selectTrack, setPlay } = usePlay(trackId);

  // Initialize waveform object
  useEffect(() => {
    console.log('wavesurfer', wavesurfer);
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
    wavesurfer.current.setMute(true);

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

  // useEffect(() => {
  //   if (isSelected) {
  //     dispatch(setWaveform(wavesurfer.current));
  //   }
  // }, [isSelected]);
  useEffect(() => {
    if (isPlaying && currentTrackId === trackId) {
      console.log('playing');
      wavesurfer.current.play(currentTime);
    } else {
      console.log('paused');
      wavesurfer.current.pause();
    }
  }, [isPlaying, currentTrackId, trackId]);

  // useEffect(() => {
  //   if (!isGlobal) {
  //     wavesurfer.current.setMute(true);
  //     return;
  //   }

  //   // Sync application time with global wavesurfer object
  //   const onAudioProcess = () => {
  //     if (isGlobal && isSelected) {
  //       // const globalTime = wavesurfer.current.getCurrentTime();
  //       dispatch(updateTime(wavesurfer.current.getCurrentTime()));
  //     }
  //   };

  //   wavesurfer.current.on('audioprocess', onAudioProcess);

  //   return () => wavesurfer.current.un('audioprocess', onAudioProcess);
  // }, [isGlobal, isSelected, wavesurfer.current, dispatch]);

  // Send waveform ref to store
  // useEffect(() => {
  //   if (isSelected) {
  //     dispatch(setWaveform(wavesurfer));
  //   }
  // }, [isSelected, dispatch, wavesurfer]);

  // useEffect(() => {
  //   if (isSelected && isPlaying) {
  //     wavesurfer.current.play();
  //   } else {
  //     wavesurfer.current.pause();
  //   }
  // }, [isSelected, isPlaying, wavesurfer.current]);

  // useEffect(() => {
  //   if (isSelected) {
  //     wavesurfer?.current.seekTo(seekPosition || 0);
  //   }
  // }, [isSelected, seekPosition]);

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
      selectTrack(trackId);
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
