import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTracks } from '../../store/trackReducer';
import toArray from '../../utils/toArray';
import MusicPlayer from '../MusicPlayer';

const Stream = () => {
  const dispatch = useDispatch();
  const tracksObject = useSelector((state) => state.tracks);
  const tracks = toArray(tracksObject);

  useEffect(() => {
    dispatch(getAllTracks());
  }, [dispatch]);

  return (
    <div className="stream">
      {tracks.map((track) => (
        <MusicPlayer track={track} />
      ))}
    </div>
  );
};

export default Stream;
