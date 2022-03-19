import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setReference,
  setTrack,
  updateTime,
  playNext,
  endPlayback,
} from '../../actions/playerActions';

function Audio({ trackId }) {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.tracks[trackId]);
  const { queue, nextIndex } = useSelector((state) => state.queue);
  const { isPlaying, currentTrackId, seekingTime, reference } = useSelector(
    (state) => state.player
  );

  // const audioRef = useRef(reference);
  const audioRef = useRef(null);

  useEffect(() => {
    console.log('audioRef', audioRef, 'redux reference', reference);
    console.log('equality check', audioRef === reference);
    isPlaying && currentTrackId === trackId
      ? audioRef.current.play()
      : audioRef.current.pause();
  }, [isPlaying, currentTrackId, trackId, dispatch]);

  useEffect(() => {
    audioRef.current.currentTime = seekingTime;
  }, [seekingTime]);

  const onTimeUpdate = () => {
    dispatch(updateTime(audioRef.current.currentTime));
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
      crossOrigin="anonymous"
      ref={audioRef}
      onTimeUpdate={onTimeUpdate}
      // onPlay={() => {
      //   console.log('time', audioRef.current.currentTime);
      //   dispatch(setReference(audioRef));
      // }}
      onPlay={onPlay}
      onEnded={onEnded}
    />
  );
}

export default Audio;
