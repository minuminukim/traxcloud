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
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div
      className={`${className} ${withPlayback && 'artwork-playback'}`}
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
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

const TrackArtworkWithPlayback = ({
  className,
  playbackClass,
  playbackSize,
  trackId,
  children,
}) => {
  return (
    <div className={`artwork-with-playback ${className}`}>
      <span className="artwork-overlay">
        <PlaybackButton
          className={playbackClass}
          size={playbackSize}
          trackId={trackId}
        />
      </span>
      {/* <TrackArtwork /> */}
      {children}
    </div>
  );
};

export default TrackArtwork;
