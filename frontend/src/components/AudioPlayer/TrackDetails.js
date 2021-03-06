import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import calculateTimeSincePost from '../../utils/calculateTimeSincePost';
import './TrackDetails.css';

const TrackDetails = ({ trackId, size }) => {
  const track = useSelector((state) => state.tracks[trackId]);
  const user = useSelector((state) => state.users[track.userId]);
  const timeSince = calculateTimeSincePost(track.createdAt);

  return (
    <div className={`track-details track-details-${size}`}>
      <div className={`track-links track-links-${size}`}>
        <Link className={`link-user-${size}`} to={`/users/${track.userId}`}>
          {user.displayName}
        </Link>
        {size === 'large' ? (
          <h1 className={`link-title-${size}`}>
            {' '}
            <span>{track.title}</span>
          </h1>
        ) : (
          <Link className={`link-title-${size}`} to={`/tracks/${trackId}`}>
            {track.title}
          </Link>
        )}
      </div>
      {size === 'large' && <div className="time-since">{timeSince}</div>}
    </div>
  );
};

export default TrackDetails;
