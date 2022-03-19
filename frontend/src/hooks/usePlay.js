import { useDispatch, useSelector } from 'react-redux';
import { playTrack, setTrack } from '../actions/playerActions';
import { editTrack } from '../actions/trackActions';

const usePlay = (trackId) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { currentTrackId } = useSelector((state) => state.player);
  const track = useSelector((state) => state.tracks[trackId]);
  const { queue } = useSelector((state) => state.queue);

  const isCurrentlyPlaying = trackId === currentTrackId;
  const trackBelongsToUser = sessionUser?.id === track?.userId;

  const setPlay = () => {
    const trackIndex = queue.indexOf(trackId);
    dispatch(playTrack(trackId, trackIndex));
  };

  const selectTrack = () => {
    // If a new track has been selected
    if (!isCurrentlyPlaying) {
      dispatch(setTrack(trackId));
    }
  };

  const incrementPlayCount = () => {
    if (trackBelongsToUser || isCurrentlyPlaying) {
      return;
    }

    const updatedTrack = {
      ...track,
      playCount: track.playCount + 1,
    };

    dispatch(editTrack(updatedTrack));
  };

  return { incrementPlayCount, isCurrentlyPlaying, selectTrack, setPlay };
};

export default usePlay;
