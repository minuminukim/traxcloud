import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TrackArtwork from '../TrackArtwork';

const SoundBadge = () => {
  const { currentTrackID } = useSelector((state) => state.player);
  const track = useSelector((state) => state.tracks[currentTrackID]);
  const { username } = track.User;
  return (
    <div className="soundbadge">
      <div>
        <TrackArtwork trackID={currentTrackID} height="30" width="30" />
      </div>
      <div className="soundbadge-links">
        <Link className="link-light" to={`#`}>
          {username}
        </Link>
        <Link to={`/tracks/${currentTrackID}`}>{track.title}</Link>
      </div>
    </div>
  );
};

export default SoundBadge;
