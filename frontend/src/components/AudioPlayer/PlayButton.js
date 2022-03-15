import { useDispatch } from 'react-redux';
import { playTrack } from '../../actions/playerActions';
import './PlayButton.css';

const PlayButton = ({ size }) => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(playTrack());

  return (
    <button
      className={`media-button play-button ${size}-button`}
      onClick={handleClick}
    ></button>
  );
};

export default PlayButton;
