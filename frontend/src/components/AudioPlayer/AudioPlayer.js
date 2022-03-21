import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleUser } from '../../store/userReducer';
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
  withArtwork = false,
  withHeader = false,
  withFooter = false,
  withCommentField = false,
}) => {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.tracks[trackId]);
  const sessionUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users[track.userId]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }

    dispatch(fetchSingleUser(track.userId))
      .then(() => setLoading(false))
      .catch((err) => console.log('error fetching user', err));
  }, [user, track.userId]);

  return (
    <div className={`player track-${track.id} player-${size}`}>
      {withHeader && !isLoading && <TrackHeader trackId={trackId} />}
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
            {!isLoading && <TrackDetails trackId={track.id} size={size} />}
          </div>
          <div className="waveform-row">
            <Waveform trackId={trackId} size={size} />
            <Timeline trackId={trackId} />
          </div>
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
