import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTime, setMetadata, setTrack } from '../../actions/playerActions';

function Audio(trackID) {
  const track = useSelector((state) => state.tracks[trackID]);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const dispatch = useDispatch();
  const audioRef = useRef(null);

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  const handleTimeUpdate = () =>
    dispatch(updateTime(audioRef?.current.currentTime));

  const handleLoadedMetaData = () =>
    dispatch(setMetadata(audioRef?.current.duration));

  const handlePlay = () => setTrack(track?.id);

  return (
    <audio
      src={track?.trackUrl}
      id={`track-${track?.id}`}
      crossOrigin="anonymous"
      ref={audioRef}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetaData}
      onPlay={handlePlay}
    />
  );
}

export default Audio;
