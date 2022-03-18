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

const ProgressBar = ({ trackId, transparent = false }) => {
  const dispatch = useDispatch();
  const { duration } = useSelector((state) => state.tracks[trackId]);
  const { currentTime, currentTrackId, audio } = useSelector(
    (state) => state.player
  );

  const isCurrent = isCurrentTrack(+trackId, currentTrackId);
  
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
      <div
        className={`timers-container ${isCurrent ? 'between' : 'end'} ${
          transparent && 'transparent'
        }`}
      >
        {isCurrent && (
          <p className={`timer-text ${transparent && 'transparent'}`}>
            {formatTime(currentTime)}
          </p>
        )}
        <p className={`duration-text ${transparent && 'transparent'}`}>
          {formatTime(duration)}
        </p>
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
