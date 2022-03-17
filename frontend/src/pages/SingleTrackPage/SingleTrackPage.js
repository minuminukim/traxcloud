import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleTrack } from '../../store/trackReducer';
import { setPlaylist } from '../../actions/playerActions';
import { fetchCommentsByTrackId } from '../../actions/commentActions';
import AudioPlayer from '../../components/AudioPlayer';
import TrackArtwork from '../../components/TrackArtwork';
import UserCard from '../../components/UserCard';
import CommentField from '../../components/CommentField';
import CommentsList from '../../components/CommentsList';
import './SingleTrackPage.css';

const SingleTrackPage = () => {
  const dispatch = useDispatch();
  const { trackId } = useParams();
  const { playlist } = useSelector((state) => state.player);
  const track = useSelector((state) => state.tracks[trackId]);
  const allComments = useSelector((state) => state.comments);
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoading, setLoading] = useState(true);
  const commentIds = track?.commentIds;

  useEffect(() => {
    if (track && commentIds) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const [fetchedTrack, _comments] = await Promise.all([
          dispatch(fetchSingleTrack(+trackId)),
          dispatch(fetchCommentsByTrackId(+trackId)),
        ]);

        if (!playlist.length) {
          dispatch(setPlaylist([fetchedTrack.id]));
        }

        setLoading(false);
      } catch (err) {
        console.log('error fetching tracks', err);
      }
    })();
  }, [dispatch, trackId, commentIds]);

  return (
    !isLoading && (
      <div className="page-container single-track-page">
        <div className="single-track-container">
          <AudioPlayer trackId={trackId} size="large" withArtwork={false} />
          <TrackArtwork className="artwork-large" trackId={trackId} />
        </div>
        <div className="single-track-page-main">
          {sessionUser && <CommentField duration={track.duration} />}
          <div className="single-track-page-main-row">
            <UserCard user={track?.User} size="medium" avatarSize="large" />
            <CommentsList />
          </div>
        </div>
      </div>
    )
  );
};

export default SingleTrackPage;
