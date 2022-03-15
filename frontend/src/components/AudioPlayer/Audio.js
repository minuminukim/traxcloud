import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setMetadata,
  setReference,
  updateTime,
} from '../../actions/playerActions';

function Audio({ trackID }) {
  const track = useSelector((state) => state.tracks[trackID]);
  const { isPlaying, currentTrackID } = useSelector((state) => state.player);

  const dispatch = useDispatch();
  const audioRef = useRef(null);

  useEffect(() => {
    isPlaying && currentTrackID === +trackID
      ? audioRef.current.play()
      : audioRef.current.pause();

    dispatch(setReference(audioRef));
  }, [isPlaying, currentTrackID, dispatch]);

  const handleTimeUpdate = () =>
    // dispatch(updateTime(audioRef.current.currentTime));
    dispatch(updateTime(audioRef.current.currentTime));

  const handleLoadedMetaData = () =>
    dispatch(setMetadata(audioRef.current.duration));

  return (
    <audio
      src={track?.trackUrl}
      id={`track-${track?.id}`}
      crossOrigin="anonymous"
      ref={audioRef}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetaData}
    />
  );
}

export default Audio;
