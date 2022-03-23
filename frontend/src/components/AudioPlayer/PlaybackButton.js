import { useDispatch, useSelector } from 'react-redux';
import usePlay from '../../hooks/usePlay';
import { updateTime, playTrack, pauseTrack } from '../../actions/playerActions';
import LoadingSpinner from '../common/LoadingSpinner';
import { FaPlay, FaPause } from 'react-icons/fa';
import './PlayButton.css';
import { useLocation } from 'react-router-dom';
import useTimer from '../../hooks/useTimer';

const PlaybackButton = ({
  className = '',
  size,
  trackId,
  isReady,
  isGlobal = false,
  isTile = false,
  withBackground = true, // round & orange or transparent
}) => {
  const dispatch = useDispatch();
  const { isPlaying, currentTrackId } = useSelector((state) => state.player);
  const track = useSelector((state) => state.tracks[trackId]);
  const { timer, clearTimer } = useTimer(trackId);
  const { incrementPlayCount, isSelected, selectTrack, setPlaying } = usePlay(
    +trackId
  );

  const onPause = () => {
    dispatch(pauseTrack());
    clearTimer();
  };

  const onPlay = () => {
    // If a new track has been selected, we want to clear the previous state
    if (!currentTrackId || !isSelected) {
      selectTrack();
      incrementPlayCount(trackId);
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
