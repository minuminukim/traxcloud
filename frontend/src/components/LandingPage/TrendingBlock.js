import prefixCORS from '../../utils/prefixCORS';
import { onImageError } from '../../utils/onImageError';
import './TrendingBlock.css';

const TrendingBlock = ({ track }) => {
  const { User } = track;
  return (
    <div className="trending-block">
      <img
        className="trending-art"
        src={prefixCORS(track.artworkUrl)}
        crossOrigin="true"
        onError={onImageError}
      />
      <a href={`/tracks/${track.id}`} className="trending-title">
        {track.title}
      </a>
      <a href={`/users/${User.id}`} className="trending-artist">
        {User.displayName}
      </a>
    </div>
  );
};

export default TrendingBlock;
