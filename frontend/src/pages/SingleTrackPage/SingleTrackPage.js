import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleTrack } from '../../store/trackReducer';
import { setPlaylist } from '../../actions/playerActions';
import AudioPlayer from '../../components/AudioPlayer';
import TrackArtwork from '../../components/TrackArtwork';
import UserCard from '../../components/UserCard';
import { fetchCommentsByTrackId } from '../../actions/commentActions';

const SingleTrackPage = () => {
  const dispatch = useDispatch();
  const { trackId } = useParams();
  const { playlist } = useSelector((state) => state.player);
  const track = useSelector((state) => state.tracks[trackId]);
  const allComments = useSelector((state) => state.comments);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [track, _comments] = await Promise.all([
          dispatch(fetchSingleTrack(+trackId)),
          // dispatch(fetchTracks()),
          dispatch(fetchCommentsByTrackId(+trackId)),
        ]);
        dispatch(setPlaylist([track.id, ...playlist]));
        // dispatch(setPlaylist(tracks.map(({ id }) => id)));
        setLoading(false);
      } catch (err) {
        console.log('error fetching tracks', err);
      }
    })();
  }, [dispatch]);

  return (
    !isLoading && (
      <div className="page-container">
        <div className="single-track-container">
          <AudioPlayer trackId={trackId} size="large" withArtwork={false} />
          <TrackArtwork className="artwork-large" trackId={trackId} />
        </div>
        {/* <UserCard user={track?.User} size="medium" /> */}
        {/* {track?.commentIds.map((id) => allComments[id].body)} */}
      </div>
    )
  );
};

export default SingleTrackPage;
