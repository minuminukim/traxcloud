import { Link } from 'react-router-dom';
import PlayableTile from '../../components/PlayableTile';
import './TrendingBlock.css';

const TrendingBlock = ({ track }) => {
  const { User } = track;
  return (
    <div className="trending-block">
      <PlayableTile
        className="trending-art"
        trackId={track.id}
        playbackSize="large"
      />
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
