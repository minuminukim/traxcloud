import { LOAD_QUEUE, APPEND_QUEUE, RESET_QUEUE } from '../actions/queueActions';

import { PLAY_TRACK } from '../actions/playerActions';

const initialState = {
  queue: [],
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
        queue: action.tracks,
        previousIndex: null,
        currentIndex: 0,
        nextIndex: action.tracks[1] ? 1 : null,
      };

    case APPEND_QUEUE:
      return {
        ...state,
        queue: [...state.queue, action.track],
      };

    case RESET_QUEUE:
      return initialState;

    case PLAY_TRACK:
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
