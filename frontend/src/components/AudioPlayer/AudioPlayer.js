import { useSelector } from 'react-redux';
import { isCurrentTrack } from '../../utils';
import Waveform from '../Waveform';
import {
  PlaybackButton,
  ProgressBar,
  TrackDetails,
  TrackHeader,
  PlayerFooter,
} from '.';

import CommentField from '../CommentField';
import TrackArtwork from '../TrackArtwork';
import './AudioPlayer.css';

const AudioPlayer = ({
  trackId,
  size,
  withArtwork = false,
  withHeader = false,
  withFooter = false,
  withCommentField = false,
}) => {
  const track = useSelector((state) => state.tracks[trackId]);
  const sessionUser = useSelector((state) => state.session.user);
  const { currentTrackId } = useSelector((state) => state.player);
  const isCurrent = isCurrentTrack(+trackId, currentTrackId);

  return (
    <div className={`player track-${track.id} player-${size}`}>
      {withHeader && <TrackHeader trackId={trackId} />}
      <div className="player-main">
        {withArtwork && (
          <TrackArtwork
            className={`track-artwork artwork-${size}`}
            trackId={trackId}
          />
        )}
        <div className="player-content">
          <div className="player-header">
            <PlaybackButton size={size} trackId={trackId} />
            <TrackDetails trackId={track.id} size={size} />
          </div>
          <Waveform trackId={trackId} />
          <ProgressBar trackId={trackId} isCurrent={isCurrent} />
          {withCommentField && sessionUser && (
            <CommentField
              trackId={trackId}
              duration={track.duration}
              height={32}
            />
          )}
          {withFooter && <PlayerFooter trackId={trackId} />}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
