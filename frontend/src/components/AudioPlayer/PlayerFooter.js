import { TrackActions, TrackStats } from '.';

const PlayerFooter = ({ trackId }) => {
  return (
    <div className="player-footer">
      <TrackActions trackId={trackId} />
      <TrackStats trackId={trackId} />
    </div>
  );
};

export default PlayerFooter;
