import { useSelector } from 'react-redux';
import Ministat from '../Ministat';

const TrackStats = ({ trackId }) => {
  const { playCount, commentCount } = useSelector(
    (state) => state.tracks[trackId]
  );

  return (
    <div className="player-ministats">
      <Ministat type="play" count={playCount} />
      <Ministat type="comment" count={commentCount} trackId={trackId} />
    </div>
  );
};

export default TrackStats;
