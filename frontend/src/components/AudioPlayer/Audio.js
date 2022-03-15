import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMetadata, setTrack, updateTime } from '../../actions/playerActions';

function Audio({ trackID }) {
  const track = useSelector((state) => state.tracks[trackID]);
  const { isPlaying, currentTime, currentTrackID } = useSelector(
    (state) => state.player
  );

  const dispatch = useDispatch();
  const audioRef = useRef(null);

  useEffect(() => {
    dispatch(setTrack(trackID));
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.currentTime = currentTime;
  }, [currentTime]);

  const handleTimeUpdate = () =>
    dispatch(updateTime(audioRef?.current.currentTime));

  const handleLoadedMetaData = () =>
    dispatch(setMetadata(audioRef?.current.duration));

  const handlePlay = (e) => {
    e.stopPropagation();
    dispatch(setTrack(+trackID));
  };

  return (
    <audio
      src={track?.trackUrl}
      id={`track-${track?.id}`}
      crossOrigin="anonymous"
      ref={audioRef}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetaData}
      onPlay={handlePlay}
    />
  );
}

export default Audio;
