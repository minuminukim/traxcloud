import { Link } from 'react-router-dom';
import './TrackBody.css';
import sanitizeString from '../../utils/sanitizeString';

const TrackBody = ({ track }) => {
  const user = track.User;
  const userFragment = sanitizeString(user.username);
  const trackFragment = sanitizeString(track.title);
  return (
    <div className="track-body">
      <img
        className="track-artwork"
        src={track.artworkUrl}
        alt={`${track.title} artwork`}
      ></img>
      <div className="track-signature">
        <Link to={`/${userFragment}`}>{user.displayName}</Link>
        <Link exact to={`/${userFragment}/${trackFragment}`}>
          {track.title}
        </Link>
      </div>
    </div>
  );
};

export default TrackBody;
