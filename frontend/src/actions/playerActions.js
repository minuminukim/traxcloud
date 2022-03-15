/* ----- ACTION TYPES ----- */
export const METADATA_LOADED = 'player/metadataLoaded';
export const PLAYLIST_LOADED = 'player/playlistLoaded';
export const TRACK_SET = 'player/trackSet';
export const TRACK_PLAYED = 'player/trackPlayed';
export const TRACK_PAUSED = 'player/trackPaused';
export const TIME_UPDATED = 'player/timeUpdated';
export const VOLUME_UPDATED = 'player/volumeUpdated';

/* ----- ACTIONS ----- */
export const setMetadata = (duration) => ({
  type: METADATA_LOADED,
  duration,
});

export const setTrack = (trackID) => ({
  type: TRACK_SET,
  trackID,
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

export const updateVolume = (isMuted, volume) => ({
  type: VOLUME_UPDATED,
  isMuted,
  volume,
});
