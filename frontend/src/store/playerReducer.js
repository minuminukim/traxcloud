import {
  METADATA_LOADED,
  PLAYLIST_LOADED,
  TRACK_SET,
  AUDIO_SET,
  TRACK_PLAYED,
  TRACK_PAUSED,
  TIME_UPDATED,
  VOLUME_UPDATED,
} from '../actions/playerActions';

const initialState = {
  currentTrackID: null,
  playlist: [],
  duration: 0,
  currentTime: 0,
  currentRef: null,
  isPlaying: false,
  isMuted: false,
  volume: 1,
};

/* ----- SELECTORS ----- */
export const getCurrentTrack = (trackID) => (state) => state.tracks[trackID];

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
        playlist: action.tracks,
      };

    case TRACK_SET:
      return {
        ...state,
        currentTrackID: action.trackID,
      };

    case AUDIO_SET:
      return {
        ...state,
        currentRef: action.ref,
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

    default:
      return state;
  }
}

export default playerReducer;
