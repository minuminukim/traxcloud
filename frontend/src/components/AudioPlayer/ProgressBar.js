import { useDispatch, useSelector } from 'react-redux';
import { setTrack, setSeeking } from '../../actions/playerActions';
import { formatTime } from '../../utils';
import PlaybackTime from './PlaybackTime';
import Slider from '../Slider';
import './ProgressBar.css';

const ProgressBar = ({ trackId, transparent = false }) => {
  const dispatch = useDispatch();
  const { duration } = useSelector((state) => state.tracks[trackId]);
  const { currentTime, currentTrackId, audio } = useSelector(
    (state) => state.player
  );

  const isCurrent = +trackId === currentTrackId;

  const onChange = (e) => {
    const newTime = e.target.value;
    if (!isCurrent) {
      if (audio) {
        audio.current.currentTime = 0;
      }
      dispatch(setTrack(+trackId, newTime));
    }

    dispatch(setSeeking(newTime));
  };

  return (
    <div className="player-timeline-container">
      <div className={`timers-container ${isCurrent ? 'between' : 'end'}`}>
        {isCurrent && (
          <PlaybackTime
            className="timer"
            transparent={transparent}
            time={currentTime}
          />
        )}
        <PlaybackTime
          className="duration"
          transparent={transparent}
          time={duration}
        />
      </div>
      <Slider
        className="progress-bar"
        min="1"
        max={duration || duration.toString()}
        step="1"
        value={isCurrent ? currentTime : 0}
        onChange={onChange}
      />
    </div>
  );
};

export default ProgressBar;
