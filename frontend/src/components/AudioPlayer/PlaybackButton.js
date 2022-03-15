import { useDispatch, useSelector } from 'react-redux';
import {
  playTrack,
  setTrack,
  pauseTrack,
  updateTime,
} from '../../actions/playerActions';
import { FaPlay, FaPause } from 'react-icons/fa';
import { isCurrentTrack } from '../../utils';
import './PlayButton.css';

const PlaybackButton = ({ size, trackID }) => {
  const dispatch = useDispatch();
  const { currentTrackID, isPlaying } = useSelector((state) => state.player);

  const handleClick = (e) => {
    e.stopPropagation();

    if (isPlaying) {
      dispatch(pauseTrack());

      // if a new track has been selected..
      if (!isCurrentTrack(+trackID, currentTrackID)) {
        dispatch(updateTime(0));
        dispatch(setTrack(+trackID));
        dispatch(playTrack());
      }
    } else {
      dispatch(setTrack(+trackID));
      dispatch(playTrack());
    }
  };

  const Icon =
    isPlaying && currentTrackID === +trackID ? <FaPause /> : <FaPlay />;

  return (
    <button
      className={`media-button play-button ${size}-button`}
      id={`play-${trackID}`}
      onClick={handleClick}
    >
      {Icon}
    </button>
  );
};

export default PlaybackButton;
