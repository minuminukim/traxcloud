import { useDispatch, useSelector } from 'react-redux';
import usePlay from '../../hooks/usePlay';
import useTimer from '../../hooks/useTimer';
import { playTrack, pauseTrack } from '../../actions/playerActions';
import LoadingSpinner from '../common/LoadingSpinner';
import { FaPlay, FaPause } from 'react-icons/fa';
import './PlayButton.css';

const PlaybackButton = ({
  className = '',
  size,
  trackId,
  resetQueue,
  isReady,
  isGlobal = false,
  isTile = false,
  withBackground = true, // round & orange or transparent
}) => {
  const dispatch = useDispatch();
  const { isPlaying, currentTrackId } = useSelector((state) => state.player);
  const { clearTimer } = useTimer(trackId);
  const { isSelected, selectTrack } = usePlay(+trackId);

  const onPause = () => {
    dispatch(pauseTrack());
    clearTimer();
  };

  const onPlay = () => {
    // If a new track has been selected, we want to clear the previous state
    if (!currentTrackId || !isSelected) {
      selectTrack();
      resetQueue();
    } else {
      dispatch(playTrack());
    }
  };

  if (!isReady && !isGlobal && !isTile) {
    return <LoadingSpinner />;
  }

  return (
    <button
      className={`media-button play-button ${className} ${size}-button ${
        !withBackground && 'transparent'
      }`}
      id={`play-${trackId}`}
      onClick={isPlaying && isSelected ? onPause : onPlay}
    >
      {isPlaying && isSelected ? <FaPause /> : <FaPlay />}
    </button>
  );
};

export default PlaybackButton;
