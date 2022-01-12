import { Link } from 'react-router-dom';
import TrackEditForm from '../TrackEditForm';
import ModalWrapper from '../ModalWrapper';
import EditDeleteButton from './EditDeleteButton';
import belongsTo from '../../utils/belongsTo';

const TrackButtons = (props) => {
  const { sessionId, userId, handleEdit, track, handleDelete } = props;
  const belongsToSessionUser = belongsTo(sessionId, userId);
  return (
    belongsToSessionUser && (
      <div className="track-buttons">
        <ModalWrapper
          children={<TrackEditForm track={track} />}
          className={'edit-button'}
        />
        {/* <Link to={`/tracks/${track.id}/edit`} state={{ track }}>
          <MusicPlayerButton type="Edit" handleClick={handleEdit} />
        </Link> */}
        <EditDeleteButton
          type="Delete"
          trackId={track.id}
          userId={sessionId}
          handleClick={handleDelete}
          className="delete-button"
        />
      </div>
    )
  );
};

export default TrackButtons;
