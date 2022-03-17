import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTracks } from '../../store/trackReducer';
import { setPlaylist } from '../../actions/playerActions';
import AudioPlayer from '../../components/AudioPlayer';
import TrackArtwork from '../../components/TrackArtwork';
import UserCard from '../../components/common/UserCard/UserCard';

const SingleTrackPage = () => {
  const dispatch = useDispatch();
  const { trackId } = useParams();
  const track = useSelector((state) => state.tracks[trackId]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const tracks = await dispatch(fetchTracks());
        dispatch(setPlaylist(tracks.map(({ id }) => id)));
        setLoading(false);
      } catch (err) {
        console.log('error fetching tracks', err);
      }
    })();
    // return dispatch(fetchTracks())
    //   .then(() => setIsLoading(false))
    //   .catch((err) => err);
  }, [dispatch]);

  return (
    !isLoading && (
      <div className="page-container">
        <div className="single-track-container">
          <AudioPlayer trackId={trackId} size="large" withArtwork={false} />
          <TrackArtwork className="artwork-large" trackId={trackId} />
        </div>
        <UserCard user={track?.User} size="medium" />
      </div>
    )
  );
};

export default SingleTrackPage;
