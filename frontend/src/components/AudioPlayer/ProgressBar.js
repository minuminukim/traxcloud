import { useDispatch, useSelector } from 'react-redux';
import { updateTime } from '../../actions/playerActions';
import './ProgressBar.css';

const ProgressBar = ({ trackID }) => {
  const { currentTime } = useSelector((state) => state.player);
  const { duration } = useSelector((state) => state.tracks[trackID]);
  const dispatch = useDispatch();

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString();
    const seconds = Math.floor(time - minutes * 60)
      .toString()
      .padStart(2, '0');

    return `${minutes}:${seconds}`;
  };
  const handleSeeking = (e) => dispatch(updateTime(e.target.value));

  return (
    <div className="player-timeline-container">
      <div className="timers-container">
        <p className="timer-text">{formatTime(currentTime)}</p>
        <p className="duration-text">{formatTime(duration)}</p>
      </div>
      <input
        className="progress-bar"
        type="range"
        step="1"
        min="1"
        max={duration || duration.toString()}
        value={currentTime}
        onChange={handleSeeking}
      />
    </div>
  );
};

export default ProgressBar;
