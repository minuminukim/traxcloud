import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playTrack, setTrack } from '../actions/playerActions';
import { updatePlayCount } from '../actions/trackActions';

const usePlay = (trackId) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { currentTrackId } = useSelector((state) => state.player);
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
      dispatch(setTrack(nextId));
    }
  };

  const incrementPlayCount = async (trackId) => {
    if (trackBelongsToUser) {
      return;
    }

    await dispatch(updatePlayCount(trackId));
  };

  return {
    incrementPlayCount,
    isSelected,
    selectTrack,
    setPlaying,
  };
};

export default usePlay;
