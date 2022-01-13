import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTracks } from '../../store/trackReducer';
import toArray from '../../utils/toArray';
import { byMostRecent } from '../../utils/byMostRecent';
import AudioPlayer from '../AudioPlayer';
import './Stream.css';

const Stream = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const tracksObject = useSelector((state) => state.tracks);
  const tracks = toArray(tracksObject);
  const sorted = byMostRecent(tracks);

  useEffect(() => {
    return dispatch(getAllTracks())
      .then(() => setIsLoading(false))
      .catch(async (response) => await response.json());
  }, [dispatch]);

  return (
    !isLoading && (
      <div className="stream page-container">
        <h1 className="heading-light">
          Hear the latest posts from our creators:
        </h1>
        {sorted.map((track) => (
          <AudioPlayer
            key={track.id}
            track={track}
            withArtwork={true}
            size={'medium'}
          />
        ))}
      </div>
    )
  );
};

export default Stream;
