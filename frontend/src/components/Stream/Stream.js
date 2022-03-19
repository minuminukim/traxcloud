import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTracks } from '../../actions/trackActions';
import { fetchCommentsByTrackId } from '../../actions/commentActions';
import { setQueue } from '../../actions/playerActions';
import AudioPlayer from '../AudioPlayer';
import './Stream.css';

const Stream = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { queue } = useSelector((state) => state.player);
  const tracksObject = useSelector((state) => state.tracks);

  useEffect(() => {
    (async () => {
      try {
        const tracks = await dispatch(fetchTracks());
        dispatch(setQueue(tracks.map(({ id }) => id).sort((a, b) => b - a)));
        await Promise.all(
          tracks.map(
            async ({ id }) => await dispatch(fetchCommentsByTrackId(id))
          )
        );
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
        {queue.map((id, i) => (
          <div className="stream-row" key={`row-${id}`}>
            <AudioPlayer
              key={id}
              trackId={id}
              withHeader
              withArtwork
              withCommentField
              withFooter
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
