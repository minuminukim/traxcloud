import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setDuration,
  setReference,
  updateTime,
} from '../../actions/playerActions';

function Audio({ trackID }) {
  const track = useSelector((state) => state.tracks[trackID]);
  const { isPlaying, currentTrackID, volume, audio } = useSelector(
    (state) => state.player
  );

  const dispatch = useDispatch();
  const audioRef = useRef(audio);

  useEffect(() => {
    isPlaying && currentTrackID === +trackID
      ? audioRef.current.play()
      : audioRef.current.pause();

    // dispatch(setReference(audioRef));
  }, [isPlaying, currentTrackID, dispatch]);

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
    />
  );
}

export default Audio;
