import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTracks } from '../../store/trackReducer';
import { setPlaylist } from '../../actions/playerActions';
import AudioPlayer from '../AudioPlayer';
import TrackHeader from '../AudioPlayer/TrackHeader';
import './Stream.css';

const Stream = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const tracksObject = useSelector((state) => state.tracks);
  const trackIDs = Object.keys(tracksObject).sort((a, b) => +a - +b);

  useEffect(() => {
    return dispatch(fetchTracks())
      .then(() => setIsLoading(false))
      .catch((response) => response);
  }, [dispatch]);

  useEffect(() => {
    dispatch(setPlaylist(trackIDs));
  }, [dispatch, trackIDs]);

  return (
    !isLoading && (
      <div className="stream page-container">
        <h1 className="heading-light">
          Hear the latest posts from our creators:
        </h1>
        {trackIDs.map((id) => (
          <div className="stream-row" key={`row-${id}`}>
            <TrackHeader trackID={id} />
            <AudioPlayer
              key={id}
              trackID={id}
              withArtwork={true}
              size={'medium'}
            />
          </div>
        ))}
      </div>
    )
  );
};

export default Stream;
