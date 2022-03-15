import { useDispatch, useSelector } from 'react-redux';
import { updateTime } from '../../actions/playerActions';
import { isCurrentTrack, formatTime } from '../../utils';
import './ProgressBar.css';

const ProgressBar = ({ trackID }) => {
  const { currentTime, currentTrackID, currentRef } = useSelector(
    (state) => state.player
  );

  const { duration } = useSelector((state) => state.tracks[trackID]);
  const isActive = isCurrentTrack(+trackID, currentTrackID);
  const dispatch = useDispatch();

  const handleSeeking = (e) => {
    const newTime = e.target.value;
    currentRef.current.currentTime = newTime;
    dispatch(updateTime(newTime));
  };

  return (
    <div className="player-timeline-container">
      <div className="timers-container">
        {isActive && <p className="timer-text">{formatTime(currentTime)}</p>}
        <p className="duration-text">{formatTime(duration)}</p>
      </div>
      <input
        className="progress-bar"
        type="range"
        step="1"
        min="1"
        max={duration || duration.toString()}
        value={isActive ? currentTime : 0}
        onChange={handleSeeking}
      />
    </div>
  );
};

export default ProgressBar;
