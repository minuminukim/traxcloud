import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleTrack } from '../../store/trackReducer';
import { setPlaylist } from '../../actions/playerActions';
import AudioPlayer from '../../components/AudioPlayer';
import TrackArtwork from '../../components/TrackArtwork';
import UserCard from '../../components/UserCard';
import CommentListItem from '../../components/CommentListItem';
import { fetchCommentsByTrackId } from '../../actions/commentActions';

const SingleTrackPage = () => {
  const dispatch = useDispatch();
  const { trackId } = useParams();
  const { playlist } = useSelector((state) => state.player);
  const track = useSelector((state) => state.tracks[trackId]);
  const allComments = useSelector((state) => state.comments);
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
          // dispatch(fetchTracks()),
          dispatch(fetchCommentsByTrackId(+trackId)),
        ]);
        console.log('playlist', playlist, 'trackId', trackId);
        if (!playlist.length) {
          dispatch(setPlaylist([fetchedTrack.id]));
        }
        // dispatch(setPlaylist(tracks.map(({ id }) => id)));
        setLoading(false);
      } catch (err) {
        console.log('error fetching tracks', err);
      }
    })();
  }, [dispatch, trackId, commentIds]);

  return (
    !isLoading && (
      <div className="page-container">
        <div className="single-track-container">
          <AudioPlayer trackId={trackId} size="large" withArtwork={false} />
          <TrackArtwork className="artwork-large" trackId={trackId} />
        </div>
        {/* <UserCard user={track?.User} size="medium" avatarSize="large" /> */}
        <ul className="track-comments-list">
          {commentIds &&
            [...commentIds]
              .sort((a, b) => b - a)
              .map((id) => <CommentListItem key={id} commentId={id} />)}
        </ul>
      </div>
    )
  );
};

export default SingleTrackPage;
