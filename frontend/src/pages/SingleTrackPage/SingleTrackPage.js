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

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const [track, _comments] = await Promise.all([
          dispatch(fetchSingleTrack(+trackId)),
          // dispatch(fetchTracks()),
          dispatch(fetchCommentsByTrackId(+trackId)),
        ]);
        console.log('playlist', playlist, 'trackId', trackId);
        if (!playlist.length) {
          dispatch(setPlaylist([track.id]));
        }
        // dispatch(setPlaylist(tracks.map(({ id }) => id)));
        setLoading(false);
      } catch (err) {
        console.log('error fetching tracks', err);
      }
    })();
  }, [dispatch, trackId]);

  const commentIds = track?.commentIds;

  return (
    !isLoading && (
      <div className="page-container">
        <div className="single-track-container">
          <AudioPlayer trackId={trackId} size="large" withArtwork={false} />
          <TrackArtwork className="artwork-large" trackId={trackId} />
        </div>
        {/* <UserCard user={track?.User} size="medium" /> */}
        {commentIds &&
          [...commentIds]
            .sort((a, b) => b - a)
            .map((id) => <CommentListItem key={id} commentId={id} />)}
      </div>
    )
  );
};

export default SingleTrackPage;
