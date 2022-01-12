import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTracks } from '../../store/trackReducer';
import toArray from '../../utils/toArray';
import { byMostRecent } from '../../utils/byMostRecent';
import AudioPlayer from '../AudioPlayer';

const Stream = () => {
  const dispatch = useDispatch();
  const tracksObject = useSelector((state) => state.tracks);
  const tracks = toArray(tracksObject);
  const sorted = byMostRecent(tracks);

  useEffect(() => {
    return dispatch(getAllTracks()).catch(
      async (response) => await response.json()
    );
  }, [dispatch]);

  return (
    <div className="stream">
      {sorted.map((track) => (
        <AudioPlayer key={track.id} track={track} />
      ))}
    </div>
  );
};

export default Stream;
