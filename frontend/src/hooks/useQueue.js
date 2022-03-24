import { useDispatch, useSelector } from 'react-redux';
import { setQueue } from '../actions/queueActions';

const useQueue = (trackIds = [], nextQueueId) => {
  const dispatch = useDispatch();
  const { queueId } = useSelector((state) => state.queue);
  const { isPlaying } = useSelector((state) => state.player);

  /** TYPES OF QUEUES
   * main = from '/' or '/home'
   * user-${userId} = from '/users/:userId'
   * single-${trackId} = from '/tracks/:trackId'
   */

  const isActive = queueId === nextQueueId;

  const resetQueue = (id) => {
    if (isActive || !isPlaying) return;
    
    dispatch(setQueue(trackIds, nextQueueId, id));
  };

  return { resetQueue };
};

export default useQueue;
