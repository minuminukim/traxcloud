import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const useTimer = (trackId) => {
  const intervalRef = useRef(null);
  const { currentTime, isPlaying, currentTrackId } = useSelector(
    (state) => state.player
  );
  const [timer, setTimer] = useState(currentTime);

  const clearTimer = () => clearInterval(intervalRef?.current);

  useEffect(() => {
    const isSelected = currentTrackId === trackId;

    if (isSelected && isPlaying) {
      setTimer(currentTime);
      intervalRef.current = setInterval(
        () => setTimer((time) => time + 1),
        1000
      );
    } else {
      setTimer(isSelected ? currentTime : 0);
      clearTimer();
    }

    return () => clearTimer();
  }, [currentTime, currentTrackId, trackId, isPlaying]);
  return { timer, setTimer, clearTimer };
};

export default useTimer;
