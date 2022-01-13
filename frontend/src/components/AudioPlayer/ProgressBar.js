import './ProgressBar.css';

const ProgressBar = ({ duration, currentTime, onSeeking }) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString();
    const seconds = Math.floor(time - minutes * 60)
      .toString()
      .padStart(2, '0');

    return `${minutes}:${seconds}`;
  };

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
        onChange={(e) => onSeeking(e.target.value)}
      />
    </div>
  );
};

export default ProgressBar;
