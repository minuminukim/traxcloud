import { LOAD_QUEUE, APPEND_QUEUE, RESET_QUEUE } from '../actions/queueActions';

import { SET_TRACK } from '../actions/playerActions';

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

    default:
      return state;
  }
};

export default queueReducer;
