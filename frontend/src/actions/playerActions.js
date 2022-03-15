const METADATA_LOADED = 'player/metadataLoaded';
const PLAYLIST_LOADED = 'player/playlistLoaded';
const TRACK_SET = 'player/trackStarted';
const TRACK_PLAYED = 'player/trackPlayed';
const TRACK_PAUSED = 'player/trackPaused';
const TIME_UPDATED = 'player/timeUpdated';
const VOLUME_UPDATED = 'player/volumeUpdated';

export const loadMetadata = (duration) => ({
  type: METADATA_LOADED,
  duration,
});

export const setTrack = (trackID) => ({
  type: TRACK_SET,
  trackID,
});

export const loadPlaylist = (tracks) => ({
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

export const updateVolume = (muted, volume) => ({
  type: VOLUME_UPDATED,
  muted,
  volume,
});
