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
      <span href={`/tracks/${track.id}`} className="trending-title">
        {track.title}
      </span>
      <span href={`/users/${User.id}`} className="trending-artist">
        {User.displayName}
      </span>
    </div>
  );
};

export default TrendingBlock;
