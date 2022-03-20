import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setReference,
  updateTime,
  playNext,
  endPlayback,
} from '../../actions/playerActions';

function Audio({ trackId }) {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.tracks[trackId]);
  const { queue, nextIndex } = useSelector((state) => state.queue);
  const {
    isPlaying,
    currentTrackId,
    seekTime,
    reference,
    volume,
    waveformRef,
  } = useSelector((state) => state.player);

  const audioRef = useRef(null);

  useEffect(() => {
    isPlaying && currentTrackId === trackId
      ? audioRef.current.play()
      : audioRef.current.pause();
  }, [isPlaying, currentTrackId, trackId, dispatch]);

  useEffect(() => {
    audioRef.current.currentTime = seekTime;
  }, [seekTime]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const onTimeUpdate = () => {
    dispatch(updateTime(audioRef.current.currentTime));
    waveformRef.current.setCurrentTime(audioRef.current.currentTime);
    // waveformRef.current.setCurrentTime(audioRef.current.currentTime);
  };

  const onEnded = () => {
    if (nextIndex === null) {
      dispatch(endPlayback());
    }

    const nextId = queue[nextIndex];
    dispatch(playNext(nextId, nextIndex));
  };

  const onPlay = () => {
    if (audioRef === null || audioRef !== reference) {
      dispatch(setReference(audioRef));
    }
  };

  return (
    <audio
      src={track?.trackUrl}
      id={`track-${track?.id}`}
      // crossOrigin="anonymous"
      ref={audioRef}
      onTimeUpdate={onTimeUpdate}
      onPlay={onPlay}
      onEnded={onEnded}
    />
  );
}

export default Audio;
