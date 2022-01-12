import { Link } from 'react-router-dom';

const TrackDetails = ({ displayName, userId, title, trackId }) => {
  return (
    <div className="track-details">
      <div className="track-links">
        <Link className="link-light link-user" to={`/users/${userId}`}>
          {displayName}
        </Link>
        <Link className="link-dark" to={`/tracks/${trackId}`}>
          {title}
        </Link>
      </div>
    </div>
  );
};

export default TrackDetails;
