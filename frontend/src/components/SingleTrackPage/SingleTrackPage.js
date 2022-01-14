import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {getAllTracks } from '../../store/trackReducer';
import AudioPlayer from '../AudioPlayer';
import TrackArtwork from '../common/TrackArtwork';
import UserCard from '../common/UserCard/UserCard';
import './SingleTrackPage.css';

const SingleTrackPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { trackId } = useParams();
  const dispatch = useDispatch();
  const tracks = useSelector((state) => state.tracks);
  const track = tracks[+trackId];

  useEffect(() => {
    return (
      dispatch(getAllTracks())
        .then(() => setIsLoading(false))
        .catch((err) => err)
    );
  }, [dispatch]);

  return (
    !isLoading && (
      <div className="page-container">
        <div className="single-track-container">
          <AudioPlayer track={track} size="large" withArtwork={false} />
          <TrackArtwork
            className="artwork-large"
            source={track.artworkUrl}
            title={track.title}
          />
        </div>
        <UserCard user={track?.User} size="medium" />
      </div>
    )
  );
};

export default SingleTrackPage;
