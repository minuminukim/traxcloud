import './Timeline.css';

const Timeline = ({ duration }) => {
  duration = 640;
  const minutes = Math.floor(duration / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (duration - minutes * 60).toString().padStart(2, '0');

  const durationString = `${minutes}:${seconds}`;

  return (
    <div className="player-timeline-container">
      <div className="timer-container">
        <p className="timer-text">0:00</p>
      </div>
      <input className="timeline" type="range" />
      <div className="duration-container">
        <p className="duration-text">{durationString}</p>
      </div>
    </div>
  );
};

export default Timeline;
