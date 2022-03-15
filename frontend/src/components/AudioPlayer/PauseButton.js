import { useDispatch } from 'react-redux';
import { pauseTrack } from '../../actions/playerActions';
import './PlayButton.css';

const PauseButton = ({ size }) => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(pauseTrack());

  return (
    <button
      className={`media-button pause-button ${size}-button`}
      onClick={handleClick}
    ></button>
  );
};

export default PauseButton;
