import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleTrack, getAllTracks } from '../../store/trackReducer';
import AudioPlayer from '../AudioPlayer';
import TrackArtwork from '../common/TrackArtwork';
import ProfilePicture from '../common/ProfilePicture';
import './SingleTrackPage.css';

const SingleTrackPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { trackId } = useParams();
  const dispatch = useDispatch();
  const tracks = useSelector((state) => state.tracks);
  const track = tracks[+trackId];
  const user = track?.User;
  console.log('user', user);
  // const track = tracks[+trackId];
  // console.log('track', track.User)
  // const user = track.User;

  useEffect(() => {
    // dispatch(getSingleTrack(+trackId))
    //   .then((response) => response.json())
    //   .catch((err) => console.log(err));
    return (
      dispatch(getAllTracks())
        // .then((res) => res.json())
        .then(() => setIsLoading(false))
        .catch((err) => console.log('SingleTrack', err))
    );
  }, [dispatch]);

  // console.log('track', track, typeof track.id);
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
        <ProfilePicture user={user} size="medium" />
      </div>
    )
  );
};

export default SingleTrackPage;
