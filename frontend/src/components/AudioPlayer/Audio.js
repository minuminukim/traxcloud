import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import usePlay from '../../hooks/usePlay';
import {
  updateTime,
  setSeeking,
  playNext,
  endPlayback,
} from '../../actions/playerActions';
import { useLocation } from 'react-router-dom';

function Audio({ trackId, children }) {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const location = useLocation();

  const track = useSelector((state) => state.tracks[trackId]);
  const { queue, nextIndex } = useSelector((state) => state.queue);
  const { isPlaying, currentTrackId, seekTime, volume } = useSelector(
    (state) => state.player
  );

  const isSelected = +trackId === currentTrackId;

  useEffect(() => {
    isPlaying && +trackId === currentTrackId
      ? audioRef.current.play()
      : audioRef.current.pause();
  }, [isPlaying, trackId, currentTrackId]);

  useEffect(() => {
    audioRef.current.currentTime = seekTime;
  }, [seekTime]);

  // When the location changes, we update application time
  useEffect(() => {
    if (isPlaying && isSelected) {
      dispatch(updateTime(audioRef?.current?.currentTime || 0));
    }
  }, [location, isPlaying, isSelected, dispatch]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  // If we're at the end of the queue, we end playback
  const onEnded = async () => {
    if (nextIndex === null) {
      dispatch(endPlayback());
    } else {
      const nextId = queue[nextIndex];
      await dispatch(playNext(nextId, nextIndex));
    }
  };

  const onPause = () => dispatch(updateTime(audioRef.current.currentTime));

  return (
    <audio
      src={track?.trackUrl}
      id={`track-${track?.id}`}
      crossOrigin="anonymous"
      ref={audioRef}
      onPause={onPause}
      onEnded={onEnded}
    >
      {children}
    </audio>
  );
}

export default Audio;
