import { useDispatch, useSelector } from 'react-redux';
import usePlay from '../../hooks/usePlay';
import {
  updateTime,
  setSeeking,
  pauseTrack,
} from '../../actions/playerActions';
import { FaPlay, FaPause } from 'react-icons/fa';
import './PlayButton.css';

const PlaybackButton = ({
  className = '',
  size,
  trackId,
  withBackground = true, // round & orange or transparent
}) => {
  const dispatch = useDispatch();
  const { isPlaying, currentTrackId } = useSelector((state) => state.player);
  const { incrementPlayCount, isSelected, selectTrack, setPlaying } = usePlay(
    +trackId
  );

  const onPause = () => dispatch(pauseTrack());

  const onPlay = () => {
    selectTrack(trackId);

    // If a new track has been selected, we want to clear the previous state
    if (currentTrackId && currentTrackId !== trackId) {
      dispatch(updateTime(0));
      dispatch(setSeeking(0, 0));
    }

    setPlaying();
    incrementPlayCount();
  };

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
