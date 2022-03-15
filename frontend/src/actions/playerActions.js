/* ----- ACTION TYPES ----- */
export const METADATA_LOADED = 'player/metadataLoaded';
export const PLAYLIST_LOADED = 'player/playlistLoaded';
export const TRACK_SET = 'player/trackSet';
export const REFERENCE_UPDATED = 'player/referenceSet';
export const TRACK_PLAYED = 'player/trackPlayed';
export const TRACK_PAUSED = 'player/trackPaused';
export const TIME_UPDATED = 'player/timeUpdated';
export const VOLUME_UPDATED = 'player/volumeUpdated';

/* ----- ACTIONS ----- */
export const setDuration = (duration) => ({
  type: METADATA_LOADED,
  duration,
});

export const setTrack = (trackID, currentTime = 0) => ({
  type: TRACK_SET,
  trackID,
  currentTime,
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
