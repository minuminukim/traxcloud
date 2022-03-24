import { useDispatch, useSelector } from 'react-redux';
import { playTrack, setTrack } from '../actions/playerActions';
import { updatePlayCount } from '../actions/trackActions';

const usePlay = (trackId) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { currentTrackId } = useSelector((state) => state.player);
  const userId = useSelector((state) => state.tracks[trackId]?.userId);
  const { queue } = useSelector((state) => state.queue);

  const isSelected = trackId === currentTrackId;
  const trackBelongsToUser = sessionUser?.id === userId;
  const trackIndex = queue.indexOf(trackId);

  const setPlaying = () => {
    dispatch(playTrack());
  };

  const selectTrack = () => {
    // If a new track has been selected
    if (!isSelected) {
      dispatch(setTrack(trackId, trackIndex));
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
