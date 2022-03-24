import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setQueue } from '../../actions/queueActions';
import AudioPlayer from '../AudioPlayer';

const PlayersList = ({
  tracks = [],
  queueType,
  listClassName,
  itemClassName,
}) => {
  const dispatch = useDispatch();
  const { queue, queueId } = useSelector((state) => state.queue);
  const { currentTrackId, isPlaying } = useSelector((state) => state.player);
  // const everyTrackReady = trackIds?.every((id) => tracks.hasOwnProperty([id]));
  // const tracksToFetch = trackIds?.filter((id) => !tracks.hasOwnProperty([id]));
  console.log('trackIds in list', tracks);
  /** TYPES OF QUEUES
   * main = from '/' or '/home'
   * user-${userId} = from '/users/:userId'
   * single-${trackId} = from '/tracks/:trackId'
   */

  // Check if list includes current track and if this is a new queue
  const shouldResetQueue =
    queueId !== queueType && isPlaying && tracks.includes(currentTrackId);

  useEffect(() => {
    console.log('queueId', queueId, 'queueType', queueType);
    if (queueId === queueType) return;
    if (shouldResetQueue) {
      dispatch(setQueue(tracks, queueType, currentTrackId));
    }
  }, [
    queue.length,
    shouldResetQueue,
    tracks,
    queueType,
    currentTrackId,
    dispatch,
  ]);

  return (
    <ul className={listClassName}>
      {tracks.map((id) => (
        <li key={id} className={itemClassName}>
          <AudioPlayer
            trackId={id}
            size="medium"
            withArtwork
            withHeader
            withFooter
            withCommentField
          />
        </li>
      ))}
    </ul>
  );
};

export default PlayersList;
