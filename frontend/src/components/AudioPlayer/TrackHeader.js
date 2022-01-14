import { Link } from 'react-router-dom';
import ProfilePicture from '../common/ProfilePicture';
import calculateTimeSincePost from '../../utils/calculateTimeSincePost';
import './TrackHeader.css';

const TrackHeader = ({ track }) => {
  const user = track.User;
  const timeSince = calculateTimeSincePost(track.createdAt);

  return (
    <div className="track-header">
      <ProfilePicture user={user} size="small" />
      <div className="track-header-text">
        <Link to={`/users/${user.id}`}>{user.displayName}</Link>
        <span>{`posted a track ${timeSince}`}</span>
      </div>
    </div>
  );
};

export default TrackHeader;
