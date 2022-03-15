// import { FaPlay } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import TrackEditForm from '../TrackEditForm';
import ModalWrapper from '../ModalWrapper';
import EditDeleteButton from './EditDeleteButton';
import belongsTo from '../../utils/belongsTo';
import { deleteTrack } from '../../store/trackReducer';
import './TrackActions.css';

const TrackActions = ({ trackID }) => {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.tracks[trackID]);
  const sessionUser = useSelector((state) => state.session.user);

  // const { sessionId, userId, track, handleDelete } = props;
  const belongsToSessionUser = belongsTo(sessionUser.id, track.userId);

  const handleDelete = async () => {
    try {
      await dispatch(deleteTrack(track.id, sessionUser.id));
    } catch (response) {
      console.log('error deleting track', response);
    }
  };

  return (
    belongsToSessionUser && (
      <div className="track-buttons">
        <div className="track-buttons-left">
          <ModalWrapper
            children={<TrackEditForm track={track} />}
            className={'edit-button'}
          />
          <EditDeleteButton
            type="Delete"
            trackID={track.id}
            userId={sessionUser.id}
            handleClick={handleDelete}
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
