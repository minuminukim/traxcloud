import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const useTimer = (trackId) => {
  const { currentTime, isPlaying, currentTrackId } = useSelector(
    (state) => state.player
  );
  const [time, setTime] = useState(currentTime);
  const intervalRef = useRef(null);

  useEffect(() => {
    const isSelected = currentTrackId === trackId;

    if (isSelected && isPlaying) {
      setTime(currentTime);
      intervalRef.current = setInterval(
        () => setTime((time) => time + 1),
        1000
      );
    } else {
      setTime(isSelected ? currentTime : 0);
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [currentTime, isPlaying, currentTrackId, trackId]);

  return { time, setTime };
};

export default useTimer;
