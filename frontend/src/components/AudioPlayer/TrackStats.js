import Ministat from '../Ministat';

const TrackStats = ({ trackId }) => {
  return (
    <div className="player-ministats">
      <Ministat type="play" trackId={trackId} />
      <Ministat type="comment" trackId={trackId} />
    </div>
  );
};

export default TrackStats;
