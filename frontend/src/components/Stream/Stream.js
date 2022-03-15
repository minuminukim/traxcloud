import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTracks } from '../../store/trackReducer';
import { setPlaylist } from '../../actions/playerActions';
import toArray from '../../utils/toArray';
import { byMostRecent } from '../../utils/byMostRecent';
import AudioPlayer from '../AudioPlayer';
import TrackHeader from '../AudioPlayer/TrackHeader';
import './Stream.css';

const Stream = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(null);
  const dispatch = useDispatch();
  const tracksObject = useSelector((state) => state.tracks);
  const tracks = toArray(tracksObject);
  const trackIDs = Object.keys(tracksObject);
  const sorted = byMostRecent(tracks);
  const sortedIDs = [...trackIDs].sort((a, b) => +a - +b);
  console.log('sortedIDs', sortedIDs);

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
        {sortedIDs.map((id) => (
          <div className="stream-row" key={`row-${id}`}>
            <TrackHeader trackID={id} />
            {/* <AudioPlayer
              key={id}
              track={track}
              withArtwork={true}
              size={'medium'}
              currentTrack={currentTrack}
              setCurrentTrack={setCurrentTrack}
            /> */}
          </div>
        ))}
      </div>
    )
  );
};

export default Stream;
