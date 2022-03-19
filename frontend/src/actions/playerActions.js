/* ----- ACTION TYPES ----- */
export const SET_TRACK = 'player/setQueue';
export const SET_REFERENCE = 'player/setReference';
export const TOGGLE_PLAYPAUSE = 'player/togglePlay';
export const PLAY_TRACK = 'player/playTrack';
export const PAUSE_TRACK = 'player/pauseTrack';
export const UPDATE_TIME = 'player/updateTime';
export const UPDATE_VOLUME = 'player/updateVolume';
export const SET_SEEKING = 'player/setSeeking';

/* ----- ACTIONS ----- */
export const setTrack = (trackId, index = 0, currentTime = 0) => ({
  type: SET_TRACK,
  trackId,
  currentTime,
  index,
});

export const setReference = (ref) => ({
  type: SET_REFERENCE,
  ref,
});

export const playTrack = (index) => ({
  type: PLAY_TRACK,
  index,
});

export const pauseTrack = () => ({
  type: PAUSE_TRACK,
});

export const updateTime = (currentTime) => ({
  type: UPDATE_TIME,
  currentTime,
});

export const updateVolume = (volume, isMuted) => ({
  type: UPDATE_VOLUME,
  isMuted,
  volume,
});

export const setSeeking = (currentTime) => ({
  type: SET_SEEKING,
  currentTime,
});

export const playNext = () => (dispatch, getState) => {
  const state = getState();
  const { queue, currentIndex } = state.queue;
  const nextIndex = currentIndex + 1 >= queue.length ? 0 : currentIndex + 1;
  const nextId = queue[nextIndex];
  dispatch(setTrack(nextId, nextIndex));
  dispatch(playTrack());
};

export const playPrevious = () => (dispatch, getState) => {
  const state = getState();
  const { queue, currentIndex } = state.queue;
  const nextIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
  const nextId = queue[nextIndex];
  dispatch(setTrack(nextId, nextIndex));
  dispatch(playTrack());
};
