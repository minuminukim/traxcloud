import {
  LOAD_QUEUE,
  SET_TRACK,
  SET_REFERENCE,
  PLAY_TRACK,
  PAUSE_TRACK,
  UPDATE_TIME,
  UPDATE_VOLUME,
  SET_SEEKING,
} from '../actions/playerActions';

const initialState = {
  currentTrackId: null,
  queue: [],
  currentIndex: 0,
  duration: 0,
  currentTime: 0,
  seekingTime: 0,
  audio: null,
  isPlaying: false,
  isMuted: false,
  volume: 1,
};

/* ----- SELECTORS ----- */
export const getCurrentTrack = (trackId) => (state) => state.tracks[trackId];

function playerReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_QUEUE:
      return {
        ...state,
        queue: action.tracks,
      };

    case SET_TRACK:
      const findIndex = (id) => state.queue.indexOf(id);
      const index = action.index ? action.index : findIndex(action.trackId);

      return {
        ...state,
        currentTrackId: action.trackId,
        currentTime: action.currentTime,
        seekingTime: action.currentTime,
        currentIndex: index,
      };

    case SET_REFERENCE:
      return {
        ...state,
        audio: action.ref,
      };

    case PLAY_TRACK:
      return {
        ...state,
        isPlaying: true,
      };

    case PAUSE_TRACK:
      return {
        ...state,
        isPlaying: false,
      };

    case UPDATE_TIME:
      return {
        ...state,
        currentTime: action.currentTime,
      };

    case UPDATE_VOLUME:
      return {
        ...state,
        volume: action.volume,
        isMuted: action.isMuted,
      };

    case SET_SEEKING:
      return {
        ...state,
        currentTime: action.currentTime,
        seekingTime: action.currentTime,
      };

    default:
      return state;
  }
}

export default playerReducer;
