import { formatTime } from '../../utils';

const PlaybackTime = ({ className, time, transparent = false }) => {
  return (
    <p className={`${className}-text ${transparent && 'transparent'}`}>
      {formatTime(time)}
    </p>
  );
};

export default PlaybackTime;
