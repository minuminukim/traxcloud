import "./ProgressBar.css";

const ProgressBar = ({ duration, currentTime }) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time - minutes * 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  return (
    <div className="player-timeline-container">
      <div className="timer-container">
        <p className="timer-text">{formatTime(currentTime)}</p>
      </div>
      <input
        className="progress-bar"
        type="range"
        step="1"
        min="1"
        max={duration || duration.toString()}
        value={currentTime}
      />
      <div className="duration-container">
        <p className="duration-text">{formatTime(duration)}</p>
      </div>
    </div>
  );
};

export default ProgressBar;
