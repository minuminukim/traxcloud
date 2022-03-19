import { useDispatch, useSelector } from 'react-redux';
import usePlay from '../../hooks/usePlay';
import { setSeeking } from '../../actions/playerActions';
import PlaybackTime from './PlaybackTime';
import Slider from '../Slider';
import './ProgressBar.css';

const ProgressBar = ({ trackId, transparent = false }) => {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.tracks[trackId]);
  const { currentTime } = useSelector((state) => state.player);
  const { incrementPlayCount, isCurrentlyPlaying, selectTrack } = usePlay(
    +trackId
  );

  const onChange = (e) => {
    selectTrack();
    dispatch(setSeeking(e.target.value));
    incrementPlayCount();
  };

  return (
    <div className="player-timeline-container">
      <div
        className={`timers-container ${isCurrentlyPlaying ? 'between' : 'end'}`}
      >
        {isCurrentlyPlaying && (
          <PlaybackTime
            className="timer"
            transparent={transparent}
            time={currentTime}
          />
        )}
        <PlaybackTime
          className="duration"
          transparent={transparent}
          time={track.duration}
        />
      </div>
      <Slider
        className="progress-bar"
        min="1"
        max={track.duration || track.duration.toString()}
        step="1"
        value={isCurrentlyPlaying ? currentTime : 0}
        onChange={onChange}
      />
    </div>
  );
};

export default ProgressBar;
