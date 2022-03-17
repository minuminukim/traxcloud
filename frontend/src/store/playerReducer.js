import {
  METADATA_LOADED,
  PLAYLIST_LOADED,
  TRACK_SET,
  REFERENCE_UPDATED,
  TRACK_PLAYED,
  TRACK_PAUSED,
  TIME_UPDATED,
  VOLUME_UPDATED,
  SEEKING_UPDATED,
} from '../actions/playerActions';

const initialState = {
  currentTrackId: null,
  playlist: [],
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
    case METADATA_LOADED:
      return {
        ...state,
        duration: action.duration,
      };

    case PLAYLIST_LOADED:
      return {
        ...state,
        playlist: action.tracks.sort((a, b) => b - a),
      };

    case TRACK_SET:
      const findIndex = (id) => state.playlist.indexOf(id);
      const index = action.index ? action.index : findIndex(action.trackId);

      return {
        ...state,
        currentTrackId: action.trackId,
        currentTime: action.currentTime,
        seekingTime: action.currentTime,
        currentIndex: index,
      };

    case REFERENCE_UPDATED:
      return {
        ...state,
        audio: action.ref,
      };

    case TRACK_PLAYED:
      return {
        ...state,
        isPlaying: true,
      };

    case TRACK_PAUSED:
      return {
        ...state,
        isPlaying: false,
      };

    case TIME_UPDATED:
      return {
        ...state,
        currentTime: action.currentTime,
      };

    case VOLUME_UPDATED:
      return {
        ...state,
        volume: action.volume,
        isMuted: action.isMuted,
      };

    case SEEKING_UPDATED:
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
