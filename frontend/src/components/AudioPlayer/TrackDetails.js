import { Link } from 'react-router-dom';
import './TrackDetails.css';

const TrackDetails = ({ displayName, userId, title, trackId, size }) => {
  return (
    <div className={`track-details track-details-${size}`}>
      <div className={`track-links track-links-${size}`}>
        <Link className={`link-user-${size}`} to={`/users/${userId}`}>
          {displayName}
        </Link>
        <Link className={`link-title-${size}`} to={`/tracks/${trackId}`}>
          {title}
        </Link>
      </div>
    </div>
  );
};

export default TrackDetails;
