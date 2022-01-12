import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTracks } from '../../store/trackReducer';
import toArray from '../../utils/toArray';
import AudioPlayer from '../AudioPlayer';

const Stream = () => {
  const dispatch = useDispatch();
  const tracksObject = useSelector((state) => state.tracks);
  const tracks = toArray(tracksObject);

  useEffect(() => {
    return dispatch(getAllTracks()).catch(
      async (response) => await response.json()
    );
  }, [dispatch]);

  return (
    <div className="stream">
      {tracks.map((track) => (
        <AudioPlayer key={track.id} track={track} />
      ))}
    </div>
  );
};

export default Stream;
