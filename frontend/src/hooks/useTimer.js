import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const useTimer = (trackId) => {
  const intervalRef = useRef(null);
  const { currentTime, isPlaying, currentTrackId } = useSelector(
    (state) => state.player
  );
  const isSelected = currentTrackId === trackId;
  const [timer, setTimer] = useState(currentTime);

  const clearTimer = () => clearInterval(intervalRef?.current);

  // console.log('currentTime', currentTime);
  useEffect(() => {
    setTimer(currentTime);
    if (isSelected && isPlaying) {
      // console.log('inEffect', currentTime);
      intervalRef.current = setInterval(
        () => setTimer((time) => time + 1),
        1000
      );
    } else {
      // setTimer(isSelected ? currentTime : 0);
      clearTimer();
    }

    return () => clearTimer();
  }, [currentTime, isSelected, isPlaying]);
  return { timer, setTimer, clearTimer };
};

export default useTimer;
