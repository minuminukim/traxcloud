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
  const { queue } = useSelector((state) => state.queue);
  const { isPlaying } = useSelector((state) => state.player);
  const { incrementPlayCount, isCurrentlyPlaying, selectTrack } = usePlay(
    +trackId
  );

  const onPause = () => dispatch(pauseTrack());
  const onPlay = () => {
    selectTrack();

    const trackIndex = queue.indexOf(+trackId);
    dispatch(playTrack(+trackId, trackIndex));
    incrementPlayCount();
  };

  return (
    <button
      className={`media-button play-button ${className} ${size}-button ${
        !withBackground && 'transparent'
      }`}
      id={`play-${trackId}`}
      onClick={isPlaying && isCurrentlyPlaying ? onPause : onPlay}
    >
      {isPlaying && isCurrentlyPlaying ? <FaPause /> : <FaPlay />}
    </button>
  );
};

export default PlaybackButton;
