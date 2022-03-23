import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import usePlay from '../../hooks/usePlay';
import useTimer from '../../hooks/useTimer';
import PlaybackTime from './PlaybackTime';
import './Timeline.css';

const Timeline = ({ trackId }) => {
  const track = useSelector((state) => state.tracks[trackId]);
  const { currentTime, isPlaying } = useSelector((state) => state.player);
  const { isSelected } = usePlay(+trackId);

  const { timer } = useTimer(trackId);

  // useEffect(() => {
  //   setTime(currentTime);

  //   if (isPlaying) {
  //     intervalRef.current = setInterval(
  //       () => setTime((prev) => prev + 1),
  //       1000
  //     );
  //   }
  //   return () => clearInterval(intervalRef.current);
  // }, [currentTime, isPlaying]);

  return (
    <div className="timeline">
      <div className={`timers-container ${isSelected ? 'between' : 'end'}`}>
        {isSelected && (
          <PlaybackTime className="timer" time={isSelected ? timer : 0} />
        )}
        <PlaybackTime className="duration" time={track.duration} />
      </div>
    </div>
  );
};

export default Timeline;
