import sanitizeString from '../../utils/sanitizeString';
import prefixCORS from '../../utils/prefixCORS';
import './TrendingBlock.css';

const TrendingBlock = ({ track }) => {
  const { User } = track;
  // const safeUser = sanitizeString(User.username);
  // const safeTitle = sanitizeString(track.title);
  return (
    <div className="trending-block">
      <img className="trending-art" src={prefixCORS(track.artworkUrl)} />
      <a
        href={`/tracks/${track.id}`}
        className="trending-title"
        crossOrigin="true"
      >
        {track.title}
      </a>
      <a href={`/users/${User.id}`} className="trending-artist">
        {User.displayName}
      </a>
    </div>
  );
};

export default TrendingBlock;
