import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playTrack, setTrack, updateTime } from '../actions/playerActions';
import { editTrack } from '../actions/trackActions';

const usePlay = (trackId) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { currentTrackId, waveformRef } = useSelector((state) => state.player);
  const track = useSelector((state) => state.tracks[trackId]);
  const { queue } = useSelector((state) => state.queue);
  const isSelected = trackId === currentTrackId;
  const trackBelongsToUser = sessionUser?.id === track?.userId;

  const setPlaying = () => {
    const trackIndex = queue.indexOf(trackId);
    dispatch(playTrack(trackId, trackIndex));
  };

  const selectTrack = (nextId) => {
    // If a new track has been selected
    if (!isSelected) {
      // if (waveformRef?.current) {
      //   waveformRef.current.stop()
      //   // waveformRef.current.setCurrentTime(0);
      //   // waveformRef.current.seekTo(0);
      // }

      dispatch(setTrack(nextId));
    }
  };

  const incrementPlayCount = () => {
    if (trackBelongsToUser || isSelected) {
      return;
    }

    const updatedTrack = {
      ...track,
      playCount: track.playCount + 1,
    };

    dispatch(editTrack(updatedTrack));
  };

  return {
    incrementPlayCount,
    isSelected,
    selectTrack,
    setPlaying,
  };
};

export default usePlay;
