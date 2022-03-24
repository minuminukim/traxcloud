import { useSelector } from 'react-redux';
import { onImageError } from '../../utils';
import { prefixCORS } from '../../utils';
import './TrackArtwork.css';

const TrackArtwork = ({ className, trackId, ...rest }) => {
  const track = useSelector((state) => state.tracks[trackId]);
  return (
    <img
      className={className}
      // src={prefixCORS(artworkUrl)}
      src={track?.artworkUrl}
      alt={`${track?.title} artwork`}
      crossOrigin="true"
      onError={onImageError}
      {...rest}
    />
  );
};

export default TrackArtwork;
