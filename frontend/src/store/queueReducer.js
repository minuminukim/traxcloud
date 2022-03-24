import { LOAD_QUEUE, APPEND_QUEUE, RESET_QUEUE } from '../actions/queueActions';

import { SET_TRACK } from '../actions/playerActions';
import { REMOVE_TRACK } from '../actions/trackActions';

/** TYPES OF QUEUES
 * main = from '/' or '/home'
 * user-${userId} = from '/users/:userId'
 * single-${trackId} = from '/tracks/:trackId'
 */

const initialState = {
  queue: [],
  queueId: '',
  previousIndex: null,
  currentIndex: null,
  nextIndex: null,
};

/* ----- SELECTORS ----- */
export const getQueue = (state) => state.queue;
export const getCurrentIndex = (state) => state.currentIndex;
export const getPreviousIndex = (state) => state.previousIndex;
export const getNextIndex = (state) => state.nextIndex;

const queueReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_QUEUE:
      return {
        // Spread in case it's a queue of one
        queue: [...action.tracks],
        queueId: action.queueId,
        previousIndex: null,
        // Find index of the player that dispatched action
        currentIndex: action.tracks.indexOf(action.trackId),
        nextIndex: action.tracks[1] ? 1 : null,
      };

    case APPEND_QUEUE:
      return {
        ...state,
        queue: [...state.queue, action.track],
      };

    case RESET_QUEUE:
      return {
        ...state,
        ...initialState,
      };

    case SET_TRACK:
      const { index } = action;

      return {
        ...state,
        currentIndex: action.index,
        previousIndex: state.queue[index - 1] ? index - 1 : null,
        nextIndex: state.queue[index + 1] ? index + 1 : null,
      };

    case REMOVE_TRACK:
      const removeIndex = state.queue.indexOf(action.trackId);
      const nextQueue =
        trackIndex === -1
          ? [...state.queue]
          : state.queue.filter((id) => id !== action.trackId);
      // if next length = 0, return to initial state
      const nextCurrentIndex = nextQueue.length > 0 ? removeIndex : null;
      const nextPreviousIndex = nextQueue.length <= 1 ? null : removeIndex - 1;
      const nextNextIndex = nextQueue.length <= 1 ? null : removeIndex + 1;

      return {
        ...state,
        currentIndex: nextCurrentIndex,
        nextIndex: nextNextIndex,
        previousIndex: nextPreviousIndex,
        queue: nextQueue,
      };

    default:
      return state;
  }
};

export default queueReducer;
