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
  const { currentTime, seekingTime } = useSelector((state) => state.player);
  const { incrementPlayCount, isSelected, selectTrack, setPlay } = usePlay(
    +trackId
  );

  // TODO: convert currentTime into a seek.position between 0-1 for the waveform

  const onScrub = (e) => {
    selectTrack();
    const position = +e.target.value / track.duration;
    // setSeekingValue(e.target.value)
    dispatch(setSeeking(position));
    // dispatch(setSeeking(e.target.value));
    setPlay();
    incrementPlayCount();
  };

  return (
    <div className="player-timeline-container">
      <div className={`timers-container ${isSelected ? 'between' : 'end'}`}>
        {isSelected && (
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
        value={isSelected ? currentTime : 0}
        // min="0"
        // max="1"
        // step="0.02"
        // value={isSelected ? seekingTime : 0}
        onChange={onScrub}
      />
    </div>
  );
};

export default ProgressBar;
