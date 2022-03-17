import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setDuration,
  setReference,
  updateTime,
  playNext,
} from '../../actions/playerActions';

function Audio({ trackId }) {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.tracks[trackId]);
  const { isPlaying, currentTrackId, seekingTime, audio } = useSelector(
    (state) => state.player
  );

  const audioRef = useRef(audio);

  useEffect(() => {
    isPlaying && currentTrackId === +trackId
      ? audioRef.current.play()
      : audioRef.current.pause();
  }, [isPlaying, currentTrackId, trackId, dispatch]);

  useEffect(() => {
    audioRef.current.currentTime = seekingTime;
  }, [seekingTime]);

  // useEffect(() => {
  //   audioRef.current.volume = volume;
  // }, [volume]);

  const handleTimeUpdate = () =>
    // dispatch(updateTime(audio.current.currentTime));
    dispatch(updateTime(audioRef.current.currentTime));

  const handleLoadedMetaData = () =>
    dispatch(setDuration(audioRef.current.duration));
  // dispatch(setDuration(audio.current.duration));

  return (
    <audio
      src={track?.trackUrl}
      id={`track-${track?.id}`}
      crossOrigin="anonymous"
      ref={audioRef}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetaData}
      onPlay={() => dispatch(setReference(audioRef))}
      onEnded={() => dispatch(playNext())}
    />
  );
}

export default Audio;
