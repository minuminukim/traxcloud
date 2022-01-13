const SET_DURATION = 'player/SET_DURATION';
const ON_PLAY = 'player/ON_PLAY';
const ON_PAUSE = 'player/ON_PAUSE';
const SET_CURRENT_TIME = 'player/SET_CURRENT_TIME';
const SET_TRACK_INDEX = 'player/SET_TRACK_INDEX';
const SET_VOLUME = 'player/SET_VOLUME';

export const onLoadedMetaData = (duration) => ({
  type: SET_DURATION,
  duration,
});

export const onInitialPlay = () => ({
  type: SET_TRACK_INDEX,
});

export const onPlay = () => ({
  type: ON_PLAY,
});

export const onPause = () => ({
  type: ON_PAUSE,
});

export const onEnded = () => ({
  type: SET_TRACK_INDEX,
});

export const playNext = (trackIndex) => ({
  type: SET_TRACK_INDEX,
  trackIndex,
});

export const playPrevious = (trackIndex) => ({
  type: SET_TRACK_INDEX,
  trackIndex,
});

export const onTimeUpdate = (currentTime) => ({
  type: SET_CURRENT_TIME,
  currentTime,
});

export const onSeeking = (currentTime) => ({
  type: SET_CURRENT_TIME,
  currentTime,
});

export const onVolumeChange = (volume) => ({
  type: SET_VOLUME,
  volume,
});

const initialState = {
  isPlaying: false,
  trackIndex: null,
  currentTime: 0,
  duration: 0,
  volume: 0,
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DURATION:
      return {
        ...state,
        duration: action.duration,
      };
    case ON_PLAY:
      return {
        ...state,
        isPlaying: true,
      };
    case ON_PAUSE:
      return {
        ...state,
        isPlaying: false,
      };
    case SET_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.currentTime,
      };
    case SET_TRACK_INDEX:
      return {
        ...state,
        trackIndex: action.trackIndex,
      };
    case SET_VOLUME:
      return {
        ...state,
        volume: action.volume,
      };
    default:
      return state;
  }
};

export default playerReducer;
