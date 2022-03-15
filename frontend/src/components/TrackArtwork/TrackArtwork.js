import { useSelector } from 'react-redux';
import { onImageError } from '../../utils';
import { prefixCORS } from '../../utils';
import './TrackArtwork.css';

const TrackArtwork = ({ className, trackID }) => {
  const { artworkUrl, title } = useSelector((state) => state.tracks[trackID]);

  return (
    <img
      className={className}
      src={prefixCORS(artworkUrl)}
      alt={`${title} artwork`}
      crossOrigin="true"
      onError={onImageError}
    />
  );
};

export default TrackArtwork;
