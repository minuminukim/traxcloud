import sanitizeString from '../../utils/sanitizeString';
import './TrendingBlock.css';

const TrendingBlock = ({ track }) => {
  const { User } = track;
  const safeUser = sanitizeString(User.username);
  const safeTitle = sanitizeString(track.title);
  return (
    <div className="trending-block">
      <img className="trending-art" src={track.artworkUrl}/>
      <a href={`/${safeUser}/${safeTitle}`} className="trending-title">
        {track.title}
      </a>
      <a href={`/${safeUser}`} className="trending-artist">
        {User.displayName}
      </a>
    </div>
  );
};

export default TrendingBlock;
