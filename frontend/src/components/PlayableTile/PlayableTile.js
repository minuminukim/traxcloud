import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleUser } from '../../store/userReducer';
import { PlaybackButton } from '../AudioPlayer';
import TrackArtwork from '../TrackArtwork';
import Overlay from '../Overlay';
import './PlayableTile.css';

const TileSignature = ({ trackId, title, displayName, userId }) => {
  return (
    <>
      <Link className="tile-title" to={`/tracks/${trackId}`}>
        {title}
      </Link>
      <Link className="tile-artist" to={`/users/${userId}`}>
        {displayName}
      </Link>
    </>
  );
};

const PlayableTile = ({
  className,
  trackId,
  playbackClass = '',
  playbackSize = 'medium',
}) => {
  const dispatch = useDispatch();
  const { isPlaying, currentTrackId } = useSelector((state) => state.player);
  const track = useSelector((state) => state.tracks[trackId]);
  const user = useSelector((state) => state.users[track?.userId]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isHovering, setHovering] = useState(false);

  const isSelected = isPlaying && currentTrackId === track?.id;

  useEffect(() => {
    if (user) return;
    (async () => {
      try {
        await dispatch(fetchSingleUser(track?.userId));
      } catch (error) {
        console.log('error fetching user data', error);
      }
    })();
  }, [user, dispatch]);

  // If player is active, overlay should be visible
  useEffect(() => {
    if (isHovering || isSelected) {
      setShowOverlay(true);
    } else {
      setShowOverlay(false);
    }
  }, [isHovering, isSelected]);

  const onMouseEnter = () => setHovering(true);
  const onMouseLeave = () => setHovering(false);

  return (
    <div className={`playable-tile ${className}`}>
      <div
        className={`${className} playable-tile-art`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {showOverlay && (
          <Overlay className="artwork-overlay absolute">
            <PlaybackButton
              trackId={trackId}
              className={`${playbackClass} responsive`}
              isTile
            />
          </Overlay>
        )}
        <TrackArtwork trackId={trackId} />
      </div>
      <div className="tile-signature">
        <TileSignature
          trackId={trackId}
          userId={track?.userId}
          title={track?.title}
          displayName={user?.displayName}
        />
      </div>
    </div>
  );
};

export default PlayableTile;
