import { useSelector } from 'react-redux';
import usePlay from '../../hooks/usePlay';
import { useTimer } from '../../hooks';
import PlaybackTime from './PlaybackTime';
import './Timeline.css';

const Timeline = ({ trackId }) => {
  const track = useSelector((state) => state.tracks[trackId]);
  const { isSelected } = usePlay(+trackId);
  const { time } = useTimer(trackId);

  return (
    <div className="timeline">
      <div className={`timers-container ${isSelected ? 'between' : 'end'}`}>
        {isSelected && (
          <PlaybackTime className="timer" time={isSelected ? time : 0} />
        )}
        <PlaybackTime className="duration" time={track.duration} />
      </div>
    </div>
  );
};

export default Timeline;
