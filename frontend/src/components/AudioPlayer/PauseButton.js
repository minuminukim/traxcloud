import { useDispatch } from 'react-redux';
import { pauseTrack } from '../../actions/playerActions';
import './PlayButton.css';

const PauseButton = ({ size, onClick }) => {

  return (
    <button
      className={`media-button pause-button ${size}-button`}
      onClick={onClick}
    ></button>
  );
};

export default PauseButton;
