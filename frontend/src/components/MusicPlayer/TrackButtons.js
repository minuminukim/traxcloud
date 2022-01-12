import { Link } from 'react-router-dom';
import TrackEditForm from '../TrackEditForm';
import ModalWrapper from '../ModalWrapper';
import MusicPlayerButton from './MusicPlayerButton';
import belongsTo from '../../utils/belongsTo';

const TrackButtons = (props) => {
  const { sessionId, userId, handleEdit, track, handleDelete } = props;
  const belongsToSessionUser = belongsTo(sessionId, userId);
  return (
    belongsToSessionUser && (
      <div className="track-buttons">
        <ModalWrapper
          label="Edit"
          children={<TrackEditForm track={track} />}
          className={'edit-button'}
        />
        {/* <Link to={`/tracks/${track.id}/edit`} state={{ track }}>
          <MusicPlayerButton type="Edit" handleClick={handleEdit} />
        </Link> */}
        <MusicPlayerButton
          type="Delete"
          trackId={track.id}
          userId={sessionId}
          handleClick={handleDelete}
        />
      </div>
    )
  );
};

export default TrackButtons;
