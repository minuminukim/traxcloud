import './TrackArtwork.css';
import { onImageError } from '../../utils/onImageError';

const TrackArtwork = ({ className, source, title }) => {
  return (
    <img
      className={className}
      src={source}
      alt={`${title} artwork`}
      crossOrigin="true"
      onError={onImageError}
    />
  );
};

export default TrackArtwork;
