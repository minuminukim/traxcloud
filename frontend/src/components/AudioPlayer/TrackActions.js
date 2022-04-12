import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import EditDeleteButton from './EditDeleteButton';
import belongsTo from '../../utils/belongsTo';
import { deleteTrack } from '../../actions/trackActions';
import './TrackActions.css';
import { pauseTrack } from '../../actions/playerActions';

const TrackActions = ({ trackId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const track = useSelector((state) => state.tracks[trackId]);
  const sessionUser = useSelector((state) => state.session.user);
  const { queue, nextIndex } = useSelector((state) => state.queue);
  const { currentTrackId } = useSelector((state) => state.player);

  const belongsToSessionUser = belongsTo(sessionUser?.id, track.userId);

  const handleDelete = async () => {
    try {
      // Pause player before we can unmount it
      if (currentTrackId === trackId) {
        dispatch(pauseTrack());
      }

      // Check if we're removing from a queue of one
      const nextTrackId = nextIndex ? queue[nextIndex] : null;
      await dispatch(deleteTrack(trackId, sessionUser.id, nextTrackId));
      history.push(`/home`);
    } catch (response) {
      console.log('error deleting track', response);
    }
  };

  const onClick = () => history.push(`/tracks/${trackId}/edit`);

  return (
    sessionUser &&
    belongsToSessionUser && (
      <div className="track-actions">
        <EditDeleteButton isEdit onClick={onClick} className="edit-button" />
        <EditDeleteButton
          isEdit={false}
          onClick={handleDelete}
          className="delete-button"
        />
      </div>
    )
  );
};

export default TrackActions;
