import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  pauseTrack,
  setTrack,
  updateTime,
  setSeeking,
} from '../../actions/playerActions';
import { isCurrentTrack, formatTime } from '../../utils';
import './ProgressBar.css';

const ProgressBar = ({ trackID }) => {
  const dispatch = useDispatch();
  const { duration } = useSelector((state) => state.tracks[trackID]);
  const { currentTime, currentTrackID, audio } = useSelector(
    (state) => state.player
  );

  const isCurrent = isCurrentTrack(+trackID, currentTrackID);
  const onChange = (e) => {
    const newTime = e.target.value;
    if (!isCurrent) {
      if (audio) {
        audio.current.currentTime = 0;
      }
      dispatch(setTrack(+trackID, newTime));
    }
    dispatch(setSeeking(newTime));
  };

  return (
    <div className="player-timeline-container">
      <div className={`timers-container ${isCurrent ? 'between' : 'end'}`}>
        {isCurrent && <p className="timer-text">{formatTime(currentTime)}</p>}
        <p className="duration-text">{formatTime(duration)}</p>
      </div>
      <input
        className="progress-bar"
        type="range"
        step="1"
        min="1"
        max={duration || duration.toString()}
        value={isCurrent ? currentTime : 0}
        onChange={onChange}
      />
    </div>
  );
};

export default ProgressBar;
