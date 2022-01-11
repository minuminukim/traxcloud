import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MusicPlayerButton from './MusicPlayerButton';
import { deleteTrack, editTrack } from '../../store/trackReducer';
import sanitizeString from '../../utils/sanitizeString';
import belongsTo from '../../utils/belongsTo';
import './MusicPlayer.css';

const MusicPlayer = ({ track }) => {
  const user = track.User;
  const userFragment = sanitizeString(user.username);
  const trackFragment = sanitizeString(track.title);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const belongsToSessionUser = belongsTo(sessionUser.id, user.id);

  const handleDelete = async () =>
    await dispatch(deleteTrack(track.id, sessionUser.id));

  // const handleEdit = async () => await dispatch(editTrack(track));

  return (
    <div className="track-body">
      <img
        className="track-artwork"
        src={track.artworkUrl}
        alt={`${track.title} artwork`}
      />
      <div className="track-signature">
        <Link to={`/${userFragment}`}>{user.displayName}</Link>
        <Link exact to={`/${userFragment}/${trackFragment}`}>
          {track.title}
        </Link>
      </div>
      <div className="player"></div>
      {belongsToSessionUser && (
        <div className="track-buttons">
          <MusicPlayerButton
            type="Edit"
            trackId={track.id}
            userId={sessionUser.id}
          />
          <MusicPlayerButton
            type="Delete"
            trackId={track.id}
            userId={sessionUser.id}
            handleClick={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
