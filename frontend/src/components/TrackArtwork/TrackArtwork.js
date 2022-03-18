import { useState } from 'react';
import { useSelector } from 'react-redux';
import { onImageError } from '../../utils';
import { prefixCORS } from '../../utils';
import { PlaybackButton } from '../AudioPlayer';
import './TrackArtwork.css';

const ArtworkOverlay = ({ playbackClass, playbackSize, trackId }) => {
  return (
    <span className="artwork-overlay">
      <PlaybackButton
        trackId={trackId}
        className={playbackClass}
        size={playbackSize}
      />
    </span>
  );
};

const TrackArtwork = ({
  className,
  trackId,
  withPlayback = false,
  playbackClass = '',
  playbackSize = 'medium',
  ...rest
}) => {
  const { artworkUrl, title } = useSelector((state) => state.tracks[trackId]);
  const { isPlaying, currentTrackId } = useSelector((state) => state.player);
  const [showOverlay, setShowOverlay] = useState(false);

  // TODO: figure out overlay state. if player is active, overlay
  // should be visible, but only  for the current track
  return (
    <div
      className={`${className} ${withPlayback && 'artwork-playback'}`}
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => {
        const isCurrent = isPlaying && currentTrackId === trackId;

        if (!isCurrent || !isPlaying) {
          setShowOverlay(false);
        }
      }}
    >
      {withPlayback && showOverlay && (
        <ArtworkOverlay
          trackId={trackId}
          playbackClass={playbackClass}
          playbackSize={playbackSize}
        />
      )}
      <img
        className={className}
        src={prefixCORS(artworkUrl)}
        alt={`${title} artwork`}
        crossOrigin="true"
        onError={onImageError}
        {...rest}
      />
    </div>
  );
};

export default TrackArtwork;
