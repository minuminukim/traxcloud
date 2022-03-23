import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTracks } from '../../actions/trackActions';
import { fetchCommentsByTrackId } from '../../actions/commentActions';
import { setQueue } from '../../actions/queueActions';
import AudioPlayer from '../../components/AudioPlayer';
import './Stream.css';

const Stream = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [streamIds, setStreamIds] = useState([]);
  const dispatch = useDispatch();
  const { currentTrackId, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    (async () => {
      try {
        const tracks = await dispatch(fetchTracks());
        const trackIds = [...tracks.map(({ id }) => id)].sort((a, b) => b - a);
        setStreamIds(trackIds);

        // A track should only appear in the queue once
        const uniqueIds =
          currentTrackId && isPlaying
            ? trackIds.filter((id) => id !== currentTrackId)
            : trackIds;

        dispatch(setQueue(uniqueIds));
        // dispatch(setQueue(tracks.map(({ id }) => id).sort((a, b) => b - a)));
        // await Promise.all(
        //   tracks.map(
        //     async ({ id }) => await dispatch(fetchCommentsByTrackId(id))
        //   )
        // );
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
        {streamIds.map((id, i) => (
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
