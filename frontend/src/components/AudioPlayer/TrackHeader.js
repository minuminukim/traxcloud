// import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfilePicture from '../common/ProfilePicture';
import calculateTimeSincePost from '../../utils/calculateTimeSincePost';
import './TrackHeader.css';

const TrackHeader = ({ trackID }) => {
  const track = useSelector((state) => state.tracks[trackID]);
  const user = track.User;
  const timeSince = calculateTimeSincePost(track.createdAt);

  return (
    <div className="track-header">
      <ProfilePicture user={user} size="small" />
      <div className="track-header-text">
        <p>{user.username}</p>
        <span>{`posted a track ${timeSince}`}</span>
      </div>
    </div>
  );
};

export default TrackHeader;
