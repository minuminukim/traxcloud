import { Link } from 'react-router-dom';
import calculateTimeSincePost from '../../utils/calculateTimeSincePost';
import './TrackDetails.css';

const TrackDetails = ({ displayName, title, trackId, size, time }) => {
  const timeSince = calculateTimeSincePost(time);

  return (
    <div className={`track-details track-details-${size}`}>
      <div className={`track-links track-links-${size}`}>
        <p className={`link-user-${size}`}>{displayName}</p>
        <Link className={`link-title-${size}`} to={`/tracks/${trackId}`}>
          {title}
        </Link>
      </div>
      {size === 'large' && <div className="time-since">{timeSince}</div>}
    </div>
  );
};

export default TrackDetails;
