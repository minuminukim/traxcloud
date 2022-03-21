import { useSelector } from 'react-redux';
import { isCurrentTrack } from '../../utils';
import Waveform from '../Waveform';
import {
  PlaybackButton,
  Timeline,
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
          <Waveform trackId={trackId} size={size} />
          <Timeline trackId={trackId} />
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
