import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTracks } from '../../actions/trackActions';
import { fetchCommentsByTrackId } from '../../actions/commentActions';
import { setQueue } from '../../actions/queueActions';
import AudioPlayer from '../../components/AudioPlayer';
import './Stream.css';

const Stream = () => {
  const dispatch = useDispatch();
  const { currentTrackId, isPlaying } = useSelector((state) => state.player);
  const tracks = useSelector((state) => state.tracks);
  const trackIds =
    Object.values(tracks)
      .map(({ id }) => id)
      ?.sort((a, b) => b - a) || [];

  useEffect(() => {
    if (trackIds.length >= 10) return;

    (async () => {
      try {
        await dispatch(fetchTracks());
        // A track should only appear in the queue once
        const uniqueIds =
          currentTrackId && isPlaying
            ? trackIds.filter((id) => id !== currentTrackId)
            : trackIds;

        dispatch(setQueue(uniqueIds));
      } catch (res) {
        console.log('error fetching tracks in Stream', res);
      }
    })();
  }, [dispatch, trackIds.length]);

  return (
    <div className="stream page-container">
      <h1 className="heading-light">
        Hear the latest posts from our creators:
      </h1>
      {trackIds.length > 0 &&
        trackIds.map((id, i) => (
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
  );
};

export default Stream;
