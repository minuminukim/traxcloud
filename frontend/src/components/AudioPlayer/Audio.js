import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import usePlay from '../../hooks/usePlay';
import {
  setReference,
  updateTime,
  setSeeking,
  playNext,
  endPlayback,
} from '../../actions/playerActions';
import { useLocation } from 'react-router-dom';

function Audio({ trackId, setTime, children }) {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const track = useSelector((state) => state.tracks[trackId]);
  const { queue, nextIndex } = useSelector((state) => state.queue);
  const { isPlaying, currentTrackId, seekTime, reference, volume } =
    useSelector((state) => state.player);
  const { selectTrack } = usePlay();
  const location = useLocation();

  useEffect(() => {
    dispatch(updateTime(audioRef?.current?.currentTime || 0));
  }, [location]);

  useEffect(() => {
    isPlaying && currentTrackId === trackId
      ? audioRef.current.play()
      : audioRef.current.pause();
  }, [isPlaying, currentTrackId, trackId]);

  useEffect(() => {
    audioRef.current.currentTime = seekTime;
  }, [seekTime]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);


  const onEnded = async () => {
    if (nextIndex === null) {
      dispatch(endPlayback());
    } else {
      const nextId = queue[nextIndex];
      selectTrack(nextId);
      dispatch(updateTime(0));
      dispatch(setSeeking(0, 0));
      await dispatch(playNext(nextId, nextIndex));
    }
  };

  const onPlay = () => {
    dispatch(updateTime(audioRef.current.currentTime));
    if (audioRef === null || audioRef !== reference) {
      dispatch(setReference(audioRef));
    }
  };

  const onPause = () => {
    dispatch(updateTime(audioRef.current.currentTime));
  };

  return (
    <audio
      src={track?.trackUrl}
      id={`track-${track?.id}`}
      crossOrigin="anonymous"
      ref={audioRef}
      // onTimeUpdate={() => setTime(audioRef.current)}
      onPlay={onPlay}
      onPause={onPause}
      onEnded={onEnded}
    >
      {children}
    </audio>
  );
}

export default Audio;
