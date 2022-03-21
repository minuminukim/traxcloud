import { useSelector } from 'react-redux';
import { onImageError } from '../../utils';
import { prefixCORS } from '../../utils';
import './TrackArtwork.css';

const TrackArtwork = ({ className, trackId, ...rest }) => {
  const { artworkUrl, title } = useSelector((state) => state.tracks[trackId]);
  return (
    <img
      className={className}
      src={prefixCORS(artworkUrl)}
      alt={`${title} artwork`}
      crossOrigin="true"
      onError={onImageError}
      {...rest}
    />
  );
};

export default TrackArtwork;
