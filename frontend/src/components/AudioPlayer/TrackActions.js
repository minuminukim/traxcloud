import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import TrackEditForm from '../TrackEditForm';
// import ModalWrapper from '../ModalWrapper';
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

  const belongsToSessionUser = belongsTo(sessionUser?.id, track.userId);

  const handleDelete = async () => {
    try {
      await dispatch(pauseTrack());
      await dispatch(deleteTrack(trackId, sessionUser.id));
    } catch (response) {
      console.log('error deleting track', response);
    }
  };

  const onEditClick = () => history.push(`/tracks/${trackId}/edit`);

  return (
    sessionUser &&
    belongsToSessionUser && (
      <div className="track-actions">
        <EditDeleteButton
          isEdit
          onClick={onEditClick}
          className="edit-button"
        />
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
