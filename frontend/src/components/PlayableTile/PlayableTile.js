import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PlaybackButton } from '../AudioPlayer';
import { TrackArtwork, Overlay } from '../TrackArtwork';
import './PlayableTile.css';

const TileSignature = ({ trackId, title, displayName }) => {
  return (
    <>
      <Link className="tile-title" to={`/tracks/${trackId}`}>
        {title}
      </Link>
      {/* TODO: replace link to profile */}
      <Link className="tile-artist" to="#">
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
  const { isPlaying, currentTrackId } = useSelector((state) => state.player);
  const track = useSelector((state) => state.tracks[trackId]);
  const [showOverlay, setShowOverlay] = useState(false);

  const isCurrentlyPlaying = isPlaying && currentTrackId === trackId;

  // if player is active, overlay should be visible
  useEffect(() => {
    if (isCurrentlyPlaying) setShowOverlay(true);
    else setShowOverlay(false);
  }, [isCurrentlyPlaying]);

  const onMouseEnter = () => setShowOverlay(true);
  const onMouseLeave = () => {
    if (!isCurrentlyPlaying) {
      setShowOverlay(false);
    }
  };

  return (
    <div className={`playable-tile ${className}`}>
        <div
          className={`${className} playable-tile-art`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {showOverlay && (
            <Overlay>
              <PlaybackButton
                trackId={trackId}
                className={playbackClass}
                size={playbackSize}
              />
            </Overlay>
          )}
          <TrackArtwork trackId={trackId} />
        </div>
        <div className="tile-signature">
          <TileSignature
            trackId={trackId}
            title={track?.title}
            displayName={track?.User?.displayName}
          />
      </div>
    </div>
  );
};

export default PlayableTile;
