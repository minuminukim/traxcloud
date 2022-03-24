import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTracks } from '../../actions/trackActions';
import { setQueue } from '../../actions/queueActions';
import AudioPlayer from '../../components/AudioPlayer';
import PlayersList from '../../components/PlayersList';
import './Stream.css';

const Stream = () => {
  const dispatch = useDispatch();
  const { currentTrackId, isPlaying } = useSelector((state) => state.player);
  const tracks = useSelector((state) => state.tracks);
  const trackIds = Object.keys(tracks)
    ?.map((id) => +id)
    ?.sort((a, b) => b - a);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    console.log('trackIds', trackIds);
    if (trackIds.length >= 8) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        await dispatch(fetchTracks());
        // A track should only appear in the queue once
        // const uniqueIds =
        //   currentTrackId && isPlaying
        //     ? trackIds.filter((id) => id !== currentTrackId)
        //     : trackIds;

        // dispatch(setQueue(uniqueIds));
        setLoading(false);
      } catch (res) {
        console.log('error fetching tracks in Stream', res);
      }
    })();
  }, [dispatch, trackIds.length]);

  return (
    !isLoading && (
      <div className="stream page-container">
        <h1 className="heading-light">
          Hear the latest posts from our creators:
        </h1>
        <PlayersList
          tracks={trackIds}
          queueType="main"
          listClassName="main-stream"
          itemClassName="stream-row"
        />
        <div></div>
      </div>
    )
  );
};

export default Stream;
