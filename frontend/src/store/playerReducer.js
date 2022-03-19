import {
  SET_TRACK,
  SET_REFERENCE,
  PLAY_TRACK,
  PAUSE_TRACK,
  UPDATE_TIME,
  UPDATE_VOLUME,
  SET_SEEKING,
  END_PLAYBACK,
} from '../actions/playerActions';

const initialState = {
  currentTrackId: null,
  currentTime: 0,
  seekingTime: 0,
  reference: null,
  isPlaying: false,
  isMuted: false,
  volume: 1,
};

/* ----- SELECTORS ----- */
export const getCurrentTrack = (trackId) => (state) => state.tracks[trackId];

function playerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TRACK:
      // dispatched by onPlay and onSeek events
      return {
        ...state,
        currentTrackId: action.trackId,
      };

    case SET_REFERENCE:
      return {
        ...state,
        reference: action.ref,
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

    case END_PLAYBACK:
      return {
        ...state,
        isPlaying: false,
        currentTime: 0,
        seekingTime: 0,
      };

    default:
      return state;
  }
}

export default playerReducer;
