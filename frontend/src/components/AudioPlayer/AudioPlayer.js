import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleUser } from '../../store/userReducer';
import { fetchSingleTrack } from '../../actions/trackActions';
import Waveform from '../Waveform';
import CommentField from '../CommentField';
import TrackArtwork from '../TrackArtwork';
import {
  PlaybackButton,
  Timeline,
  TrackDetails,
  TrackHeader,
  PlayerFooter,
} from '.';

import './AudioPlayer.css';

const AudioPlayer = ({
  trackId,
  size,
  resetQueue,
  withArtwork = false,
  withHeader = false,
  withFooter = false,
  withCommentField = false,
}) => {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.tracks[trackId]);
  const sessionUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users[track?.userId]);
  const [waveformReady, setReady] = useState(false);

  useEffect(() => {
    if (track) return;

    (async () => {
      await dispatch(fetchSingleTrack(+trackId)).catch((error) =>
        console.log(`error fetching track ${trackId} in AudioPlayer`, error)
      );
    })();
  }, [track, trackId]);

  useEffect(() => {
    // Fetch only when user or a
    // reference to track.userId doesn't exist
    if (user || !track?.userId) {
      return;
    }

    dispatch(fetchSingleUser(track?.userId)).catch((err) =>
      console.log(`error fetching user ${track.userId} in AudioPlayer`, err)
    );
  }, [user, track?.userId]);

  // When waveform fires 'waveform-ready' event, we update loading state
  const onReady = () => setReady(true);

  if (!track) {
    return null;
  }

  return (
    <div className={`player track-${trackId} player-${size}`}>
      {withHeader && user && <TrackHeader trackId={trackId} />}
      <div className="player-main">
        {withArtwork && (
          <TrackArtwork
            className={`track-artwork artwork-${size}`}
            trackId={trackId}
          />
        )}
        <div className="player-content">
          <div className="player-header">
            <PlaybackButton
              size={size}
              trackId={trackId}
              isReady={waveformReady}
              resetQueue={resetQueue}
            />
            {user && <TrackDetails trackId={trackId} size={size} />}
          </div>
          <div className="waveform-row">
            <Waveform
              trackId={trackId}
              size={size}
              onReady={onReady}
              resetQueue={resetQueue}
            />
            <Timeline trackId={trackId} />
          </div>
          {withCommentField && sessionUser && (
            <CommentField trackId={trackId} height={40} />
          )}
          {withFooter && <PlayerFooter trackId={trackId} />}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
