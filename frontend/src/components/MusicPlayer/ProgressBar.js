import './ProgressBar.css';

const ProgressBar = ({ duration, currentTime }) => {
  const formatTime = (duration) => {
    const minutes = Math.floor(duration / 60);
    // .toString()
    // .padStart(2, '0');
    const seconds = duration - minutes * 60;
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="player-timeline-container">
      <div className="timer-container">
        <p className="timer-text">{currentTime}</p>
      </div>
      <input className="progress-bar" type="range" />
      <div className="duration-container">
        <p className="duration-text">{formatTime(duration)}</p>
      </div>
    </div>
  );
};

export default ProgressBar;
