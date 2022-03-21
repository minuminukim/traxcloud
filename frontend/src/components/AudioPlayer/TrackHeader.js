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
      <ProfilePicture user={user} size="small" />
      <div className="track-header-text">
        <p>
          {user.displayName}
          <span>{`posted a track ${timeSince}`}</span>{' '}
        </p>
      </div>
    </div>
  );
};

export default TrackHeader;
