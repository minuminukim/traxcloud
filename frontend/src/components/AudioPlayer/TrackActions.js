// import { FaPlay } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import TrackEditForm from '../TrackEditForm';
// import ModalWrapper from '../ModalWrapper';
import EditDeleteButton from './EditDeleteButton';
import belongsTo from '../../utils/belongsTo';
import { deleteTrack } from '../../store/trackReducer';
import './TrackActions.css';

const TrackActions = ({ trackId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const track = useSelector((state) => state.tracks[trackId]);
  const sessionUser = useSelector((state) => state.session.user);

  const belongsToSessionUser = belongsTo(sessionUser?.id, track.userId);

  const handleDelete = async () => {
    try {
      await dispatch(deleteTrack(track.id, sessionUser.id));
    } catch (response) {
      console.log('error deleting track', response);
    }
  };

  const onEditClick = () => history.push(`/tracks/${trackId}/edit`);

  return (
    sessionUser &&
    belongsToSessionUser && (
      <div className="track-buttons">
        <div className="track-buttons-left">
          {/* <ModalWrapper
            children={<TrackEditForm track={track} />}
            className={'edit-button'}
          /> */}
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
        {/* <div className="track-buttons-right">
          <div className="play-icon">
            <FaPlay />
          </div>
          <span className="play-count">{track.playCount}</span>
        </div> */}
      </div>
    )
  );
};

export default TrackActions;
