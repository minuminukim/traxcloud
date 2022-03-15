/* ----- ACTION TYPES ----- */
export const METADATA_LOADED = 'player/metadataLoaded';
export const PLAYLIST_LOADED = 'player/playlistLoaded';
export const TRACK_SET = 'player/trackSet';
export const REFERENCE_UPDATED = 'player/referenceSet';
export const TRACK_PLAYED = 'player/trackPlayed';
export const TRACK_PAUSED = 'player/trackPaused';
export const TIME_UPDATED = 'player/timeUpdated';
export const VOLUME_UPDATED = 'player/volumeUpdated';
export const SEEKING_UPDATED = 'player/seekingSet';

/* ----- ACTIONS ----- */
export const setDuration = (duration) => ({
  type: METADATA_LOADED,
  duration,
});

export const setTrack = (trackID, index = 0, currentTime = 0) => ({
  type: TRACK_SET,
  trackID,
  currentTime,
  index,
});

export const setReference = (ref) => ({
  type: REFERENCE_UPDATED,
  ref,
});

export const setPlaylist = (tracks) => ({
  type: PLAYLIST_LOADED,
  tracks,
});

export const playTrack = () => ({
  type: TRACK_PLAYED,
});

export const pauseTrack = () => ({
  type: TRACK_PAUSED,
});

export const updateTime = (currentTime) => ({
  type: TIME_UPDATED,
  currentTime,
});

export const updateVolume = (volume, isMuted) => ({
  type: VOLUME_UPDATED,
  isMuted,
  volume,
});

export const setSeeking = (currentTime) => ({
  type: SEEKING_UPDATED,
  currentTime,
});

export const playNext = () => (dispatch, getState) => {
  const state = getState();
  const { playlist, currentIndex } = state.player;
  const nextIndex = currentIndex + 1 >= playlist.length ? 0 : currentIndex + 1;
  const nextID = playlist[nextIndex];
  dispatch(setTrack(nextID, nextIndex));
  dispatch(playTrack());
};

export const playPrevious = () => (dispatch, getState) => {
  const state = getState();
  const { playlist, currentIndex } = state.player;
  const nextIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
  const nextID = playlist[nextIndex];
  dispatch(setTrack(nextID, nextIndex));
  dispatch(playTrack());
};
