import { useEffect, useRef, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setReference,
  setDuration,
  updateTime,
  setSeeking,
} from '../../actions/playerActions';
import usePlay from '../../hooks/usePlay';
import WaveSurfer from 'wavesurfer.js';

const Waveform = ({ trackId, children }) => {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.tracks[trackId]);
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const { seekPosition, currentTime } = useSelector((state) => state.player);
  const { selectTrack, isSelected, setPlay } = usePlay(trackId);
  const [isLocalSeek, setLocalSeek] = useState(false);

  // Initialize waveform
  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      progressColor: '#f50',
      backend: 'MediaElement',
      responsive: true,
      interact: true,
    });
    wavesurfer.current.load(track.trackUrl);

    return () => wavesurfer.current.destroy();
  }, [track.trackUrl]);

  // useEffect(() => {
  //   if (isSelected) {
  //     wavesurfer.current.setCurrentTime(currentTime);
  //     // wavesurfer.current.seekTo(position);
  //   }
  // }, [isSelected, currentTime]);

  // When footer slider seeking
  // useEffect(() => {
  //   if (isSelected) {
  //     if (isLocalSeek) {
  //       const time = wavesurfer.current.getCurrentTime();
  //       const position = time / track.duration;
  //       wavesurfer.current.seekTo(position);
  //       dispatch(setSeeking(position, time));
  //       setLocalSeek(false);
  //       return;
  //     }
  //     wavesurfer.current.seekTo(seekPosition || 0);
  //   }
  // }, [isLocalSeek, seekPosition]);

  const updateCurrentTrack = (e) => {
    if (!isSelected) {
      selectTrack();
      setPlay();
    }

    setLocalSeek(true);
    const offsetX =
      e.clientX - waveformRef.current.getBoundingClientRect().left;
    const offsetWidth = waveformRef.current.offsetWidth;
    const position = offsetX / offsetWidth;
    const time = track?.duration * position;
    console.log('position', position, 'time', time);
    console.log('e', e);
    console.log('offsetX', offsetX);
    console.log('waveformRef', offsetWidth);
    // const time = wavesurfer.current.getCurrentTime();
    // const position = time / track.duration;
    // wavesurfer.current.seekTo(position);
    // dispatch(setSeeking(position, time));
  };

  return (
    <div
      className="waveform-container"
      ref={waveformRef}
      onMouseDown={updateCurrentTrack}
    >
      {children}
    </div>
  );
};

export default Waveform;
