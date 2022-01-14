import './TrackArtwork.css';
import defaultImage from '../../../assets/images/default-track-artwork.jpeg';

const TrackArtwork = ({ className, source, title }) => {
  const handleError = (e) => {
    e.target.src = defaultImage;
    e.target.onerror = null;
    return true;
  };

  return (
    <img
      className={className}
      src={source}
      alt={`${title} artwork`}
      crossOrigin="true"
      onError={handleError}
    />
  );
};

export default TrackArtwork;
