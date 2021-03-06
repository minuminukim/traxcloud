import {
  SET_TRACK,
  PLAY_TRACK,
  PAUSE_TRACK,
  UPDATE_TIME,
  UPDATE_VOLUME,
  SET_SEEKING,
  END_PLAYBACK,
} from '../actions/playerActions';

import { REMOVE_TRACK } from '../actions/trackActions';

const initialState = {
  duration: null,
  currentTrackId: null,
  currentTime: 0,
  seekPosition: 0,
  seekTime: 0,
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
        isPlaying: true,
        currentTime: 0,
        seekTime: 0,
        seekPosition: 0,
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
        seekPosition: action.position,
        seekTime: action.currentTime,
        currentTime: action.currentTime,
        isPlaying: true,
      };

    case END_PLAYBACK:
      return {
        ...state,
        isPlaying: false,
        currentTime: 0,
        seekPosition: 0,
        seekTime: 0,
      };

    case REMOVE_TRACK:
      const isCurrentTrack = action.trackId === state.currentTrackId;

      return {
        ...state,
        currentTrackId: action.nextTrackId,
        isPlaying: isCurrentTrack,
        currentTime: isCurrentTrack ? state.currentTime : 0,
        seekPosition: isCurrentTrack ? state.seekPosition : 0,
        seekTime: isCurrentTrack ? state.seekTime : 0,
      };

    default:
      return state;
  }
}

export default playerReducer;
