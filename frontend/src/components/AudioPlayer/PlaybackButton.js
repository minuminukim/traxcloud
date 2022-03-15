import { useDispatch, useSelector } from 'react-redux';
import { playTrack, setTrack, pauseTrack } from '../../actions/playerActions';
import { FaPlay, FaPause } from 'react-icons/fa';
import './PlayButton.css';

const PlaybackButton = ({ size, trackID, withBackground = true }) => {
  const dispatch = useDispatch();
  const { isPlaying, audio, currentTrackID } = useSelector(
    (state) => state.player
  );
  const isCurrent = +trackID === currentTrackID;

  const onPause = () => dispatch(pauseTrack());

  const onPlay = () => {
    // if a new track has been selected..
    if (!isCurrent) {
      // reset previous ref to 0
      if (audio) {
        audio.current.currentTime = 0;
      }

      dispatch(setTrack(+trackID));
    }

    dispatch(playTrack());
  };

  return (
    <button
      className={`media-button play-button ${size}-button ${
        withBackground ? '' : 'transparent'
      }`}
      id={`play-${trackID}`}
      onClick={isPlaying && isCurrent ? onPause : onPlay}
    >
      {isPlaying && isCurrent ? <FaPause /> : <FaPlay />}
    </button>
  );
};

export default PlaybackButton;
