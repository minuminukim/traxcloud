import { useDispatch, useSelector } from 'react-redux';
import { pauseTrack, setTrack, updateTime } from '../../actions/playerActions';
import { isCurrentTrack, formatTime } from '../../utils';
import './ProgressBar.css';

const ProgressBar = ({ trackID }) => {
  const dispatch = useDispatch();
  const { duration } = useSelector((state) => state.tracks[trackID]);
  const { currentTime, currentTrackID, audio } = useSelector(
    (state) => state.player
  );

  const isActive = isCurrentTrack(+trackID, currentTrackID);

  const handleSeeking = (e) => {
    const newTime = e.target.value;
    audio.current.currentTime = newTime;
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
