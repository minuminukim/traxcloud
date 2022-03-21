import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import usePlay from '../../hooks/usePlay';
import { setSeeking } from '../../actions/playerActions';
import PlaybackTime from './PlaybackTime';
import Slider from '../Slider';
import './ProgressBar.css';

const ProgressBar = ({ trackId, transparent = false }) => {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.tracks[trackId]);
  const { currentTime, duration, seekPosition, reference } = useSelector(
    (state) => state.player
  );
  const { incrementPlayCount, isSelected, selectTrack, setPlaying } = usePlay(
    +trackId
  );

  const onScrub = (e) => {
    selectTrack(trackId);
    const position = +e.target.value / track.duration;
    dispatch(setSeeking(position, +e.target.value));
    setPlaying();
    incrementPlayCount();
  };

  return (
    <div className="player-timeline-container">
      <div className={`timers-container ${isSelected ? 'between' : 'end'}`}>
        {isSelected && <PlaybackTime className="timer" time={currentTime} />}
        <PlaybackTime className="duration" time={track.duration} />
      </div>
      {/* <div className="timeline-blur">a</div> */}
      <Slider
        className="progress-bar"
        min="1"
        max={track.duration || track.duration.toString()}
        step="1"
        value={isSelected ? currentTime : 0}
        // min="0"
        // max="1"
        // step="0.02"
        // value={isSelected ? seekPosition : 0}
        onChange={onScrub}
      />
    </div>
  );
};

export default ProgressBar;
