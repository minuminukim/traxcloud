import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useQueue } from '../../hooks';
import { fetchSingleTrack } from '../../actions/trackActions';
import { setQueue } from '../../actions/queueActions';
import AudioPlayer, { PlayerFooter } from '../../components/AudioPlayer';
import TrackArtwork from '../../components/TrackArtwork';
import UserCard from '../../components/UserCard';
import CommentField from '../../components/CommentField';
import CommentsList from '../../components/CommentsList';
import Overlay from '../../components/Overlay';
import './SingleTrackPage.css';

const SingleTrackPage = () => {
  const dispatch = useDispatch();
  const { trackId } = useParams();
  const { queue } = useSelector((state) => state.queue);
  const track = useSelector((state) => state.tracks[trackId]);
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoading, setLoading] = useState(true);

  const { resetQueue } = useQueue([+trackId], `single-${trackId}`);

  useEffect(() => {
    if (track) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        await dispatch(fetchSingleTrack(+trackId));
      } catch (err) {
        console.log('error fetching tracks', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, trackId, track, queue.length]);

  if (!track) {
    return null;
  }

  return (
    !isLoading && (
      <div className="page-container single-track-page">
        <div className="single-track-container">
          <Overlay
            className="single-track-overlay blur absolute"
            style={{ backgroundImage: `url(${track?.artworkUrl})` }}
          />
          <AudioPlayer
            trackId={+trackId}
            size="large"
            resetQueue={() => resetQueue(+trackId)}
            withArtwork={false}
            withFooter={false}
            withCommentField={false}
          />
          <TrackArtwork className="artwork-large" trackId={+trackId} />
        </div>
        <div className="single-track-page-main">
          {sessionUser && (
            <CommentField
              trackId={+trackId}
              duration={track?.duration}
              height={40}
            />
          )}
          <PlayerFooter trackId={+trackId} />
          <div className="single-track-page-main-row">
            <UserCard userId={track?.userId} size="medium" avatarSize="large" />
            <CommentsList />
          </div>
        </div>
      </div>
    )
  );
};

export default SingleTrackPage;
