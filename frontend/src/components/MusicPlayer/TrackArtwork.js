const TrackArtwork = ({ className, src, title }) => {
  return <img className={className} src={src} alt={`${title} artwork`} />;
};

export default TrackArtwork;
