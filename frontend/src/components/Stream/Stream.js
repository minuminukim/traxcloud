import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTracks } from '../../store/trackReducer';
import { setPlaylist } from '../../actions/playerActions';
import AudioPlayer from '../AudioPlayer';
import './Stream.css';

const Stream = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { playlist } = useSelector((state) => state.player);
  const tracksObject = useSelector((state) => state.tracks);

  useEffect(() => {
    (async () => {
      try {
        const tracks = await dispatch(fetchTracks());
        dispatch(setPlaylist(tracks.map(({ id }) => id)));
        setIsLoading(false);
      } catch (res) {
        console.log('error fetching tracks in Stream', res);
      }
    })();
  }, [dispatch]);

  return (
    !isLoading && (
      <div className="stream page-container">
        <h1 className="heading-light">
          Hear the latest posts from our creators:
        </h1>
        {playlist.map((id, i) => (
          <div className="stream-row" key={`row-${id}`}>
            <AudioPlayer
              key={id}
              trackID={id}
              withHeader
              withArtwork
              size={'medium'}
              index={i}
            />
          </div>
        ))}
      </div>
    )
  );
};

export default Stream;
