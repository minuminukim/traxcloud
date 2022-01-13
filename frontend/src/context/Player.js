import { createContext, useContext, useRef, useState, useEffect } from 'react';

const PlayerContext = createContext();
export const usePlayer = () => useContext(PlayerContext);
export const PlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [trackRef, setTrackRef] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => setTrackRef(trackRef.current), []);
  
  return (
    <>
      <PlayerContext.Provider
        value={{
          isPlaying,
          setIsPlaying,
          duration,
          setDuration,
          currentTime,
          setCurrentTime,
          currentTrackId,
          setCurrentTrackId,
          currentTrack,
          setCurrentTrack,
        }}
      >
        {children}
      </PlayerContext.Provider>
    </>
  );
};
