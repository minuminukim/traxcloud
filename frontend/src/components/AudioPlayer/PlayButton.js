import { useDispatch } from 'react-redux';
import { playTrack, setTrack } from '../../actions/playerActions';
import './PlayButton.css';

const PlayButton = ({ size, trackID }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(setTrack(+trackID));
    dispatch(playTrack());
  };

  return (
    <button
      className={`media-button play-button ${size}-button`}
      id={`play-${trackID}`}
      onClick={handleClick}
    ></button>
  );
};

export default PlayButton;
