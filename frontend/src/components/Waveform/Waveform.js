import { useEffect, useRef, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setReference, updateTime } from '../../actions/playerActions';
import usePlay from '../../hooks/usePlay';
import WaveSurfer from 'wavesurfer.js';

const Waveform = ({ trackId, children }) => {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.tracks[trackId]);
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const { isPlaying, volume, reference, seekingTime } = useSelector(
    (state) => state.player
  );
  const { selectTrack, isSelected, setPlay } = usePlay(trackId);

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      progressColor: '#f50',
      backend: 'MediaElement',
      responsive: true,
    });
    wavesurfer.current.load(track.trackUrl);

    return () => wavesurfer.current.destroy();
  }, [track.trackUrl]);

  useEffect(() => {
    isSelected && isPlaying
      ? wavesurfer.current.play()
      : wavesurfer.current.pause();
  }, [isSelected, isPlaying, dispatch]);

  useEffect(() => {
    wavesurfer.current.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    const onAudioProcess = () =>
      dispatch(updateTime(wavesurfer.current.getCurrentTime()));

    const onPlay = () => {
      if (reference === null || reference !== wavesurfer) {
        dispatch(setReference(wavesurfer));
      }
    };

    wavesurfer.current.on('audioprocess', onAudioProcess);
    wavesurfer.current.on('play', onPlay);

    return () => wavesurfer.current.unAll();
    // return () => wavesurfer.current.un('audioprocess', onAudioProcess);
  }, [reference, wavesurfer]);

  useEffect(() => {
    wavesurfer.current.seekTo(seekingTime);
  }, [seekingTime]);

  const updateCurrentTrack = () => selectTrack();

  return (
    <div
      className="waveform-container"
      ref={waveformRef}
      onClick={updateCurrentTrack}
    >
      {children}
    </div>
  );
};

export default Waveform;
