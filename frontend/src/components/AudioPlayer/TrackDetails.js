import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import calculateTimeSincePost from '../../utils/calculateTimeSincePost';
import './TrackDetails.css';

const TrackDetails = ({ trackID, size }) => {
  const track = useSelector((state) => state.tracks[trackID]);
  const user = track.User;
  const timeSince = calculateTimeSincePost(track.createdAt);

  return (
    <div className={`track-details track-details-${size}`}>
      <div className={`track-links track-links-${size}`}>
        <Link className={`link-user-${size}`} to="#">
          {user.username}
        </Link>
        {size === 'large' ? (
          <h1 className={`link-title-${size}`}>
            {' '}
            <span>{track.title}</span>
          </h1>
        ) : (
          <Link className={`link-title-${size}`} to={`/tracks/${trackID}`}>
            {track.title}
          </Link>
        )}
      </div>
      {size === 'large' && <div className="time-since">{timeSince}</div>}
    </div>
  );
};

export default TrackDetails;
