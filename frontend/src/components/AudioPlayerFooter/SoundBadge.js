import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TrackArtwork from '../TrackArtwork';

const SoundBadge = () => {
  const { currentTrackId } = useSelector((state) => state.player);
  const track = useSelector((state) => state.tracks[currentTrackId]);
  const { username } = track.User;
  return (
    <div className="soundbadge">
      <div className="soundbadge-image">
        <TrackArtwork trackId={currentTrackId} height="30" width="30" />
      </div>
      <div className="soundbadge-links">
        <Link className="link-light" to={`#`}>
          {username}
        </Link>
        <Link to={`/tracks/${currentTrackId}`}>{track.title}</Link>
      </div>
    </div>
  );
};

export default SoundBadge;
