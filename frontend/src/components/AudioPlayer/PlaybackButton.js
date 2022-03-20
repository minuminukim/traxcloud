import { useDispatch, useSelector } from 'react-redux';
import { playTrack, pauseTrack } from '../../actions/playerActions';
import usePlay from '../../hooks/usePlay';
import { FaPlay, FaPause } from 'react-icons/fa';
import './PlayButton.css';

const PlaybackButton = ({
  className = '',
  size,
  trackId,
  withBackground = true,
}) => {
  const dispatch = useDispatch();
  const { isPlaying } = useSelector((state) => state.player);
  const { incrementPlayCount, isSelected, selectTrack, setPlay } = usePlay(
    +trackId
  );

  const onPause = () => dispatch(pauseTrack());

  const onPlay = () => {
    selectTrack(trackId);
    setPlay();
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
