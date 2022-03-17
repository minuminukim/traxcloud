import { Link } from 'react-router-dom';
import TrackArtwork from '../../components/TrackArtwork';
import './TrendingBlock.css';

const TrendingBlock = ({ track }) => {
  const { User } = track;
  return (
    <div className="trending-block">
      <TrackArtwork className="trending-art" trackId={track.id} />
      <Link className="trending-title" to={`/tracks/${track.id}`}>
        {track.title}
      </Link>
      <span href={`/tracks/${track.id}`} className="trending-title"></span>
      <span href={`/users/${User.id}`} className="trending-artist">
        {User.displayName}
      </span>
    </div>
  );
};

export default TrendingBlock;
