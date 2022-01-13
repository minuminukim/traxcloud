import './TrackArtwork.css';

const TrackArtwork = ({ className, source, title }) => {
  return (
    <img
      className={className}
      src={source}
      alt={`${title} artwork`}
      crossOrigin="true"
    />
  );
};

export default TrackArtwork;
