import { useSelector } from 'react-redux';
import usePlay from '../../hooks/usePlay';
import PlaybackTime from './PlaybackTime';
import './Timeline.css';

const Timeline = ({ trackId }) => {
  const track = useSelector((state) => state.tracks[trackId]);
  const { currentTime } = useSelector((state) => state.player);
  const { isSelected } = usePlay(+trackId);

  return (
    <div className="timeline">
      <div className={`timers-container ${isSelected ? 'between' : 'end'}`}>
        {isSelected && <PlaybackTime className="timer" time={currentTime} />}
        <PlaybackTime className="duration" time={track.duration} />
      </div>
    </div>
  );
};

export default Timeline;
