import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfilePicture from '../common/ProfilePicture';
import { calculateTimeSincePost } from '../../utils/';
import './TrackHeader.css';

const TrackHeader = ({ trackId }) => {
  const track = useSelector((state) => state.tracks[trackId]);
  const user = useSelector((state) => state.users[track.userId]);
  const timeSince = calculateTimeSincePost(track.createdAt);

  return (
    <div className="track-header">
      <Link to={`/users/${track.userId}`}>
        <ProfilePicture user={user} size="small" />
      </Link>
      <div className="track-header-text">
        <p>
          <Link to={`/users/${track.userId}`}>{user.displayName}</Link>
          <span>{`posted a track ${timeSince}`}</span>{' '}
        </p>
      </div>
    </div>
  );
};

export default TrackHeader;
