import { useDispatch, useSelector } from 'react-redux';
import { setTrack, setSeeking } from '../../actions/playerActions';
import { editTrack } from '../../actions/trackActions';
import PlaybackTime from './PlaybackTime';
import Slider from '../Slider';
import './ProgressBar.css';

const ProgressBar = ({ trackId, transparent = false }) => {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.tracks[trackId]);
  const sessionUser = useSelector((state) => state.session.user);
  const { currentTime, currentTrackId, reference } = useSelector(
    (state) => state.player
  );

  const isCurrentTrack = +trackId === currentTrackId;

  const onChange = (e) => {
    const newTime = e.target.value;
    if (!isCurrentTrack) {
      if (reference) {
        reference.current.currentTime = 0;
      }
      dispatch(setTrack(+trackId, newTime));
    }

    dispatch(setSeeking(newTime));

    // if track doesn't belong to current user, or it's currently playing we
    // dispatch to update playcount
    if ((sessionUser && sessionUser.id === track.userId) || isCurrentTrack)
      return;
    const { playCount } = track;
    const updated = { ...track, playCount: playCount + 1 };
    dispatch(editTrack(updated));
  };

  return (
    <div className="player-timeline-container">
      <div className={`timers-container ${isCurrentTrack ? 'between' : 'end'}`}>
        {isCurrentTrack && (
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
        value={isCurrentTrack ? currentTime : 0}
        onChange={onChange}
      />
    </div>
  );
};

export default ProgressBar;
