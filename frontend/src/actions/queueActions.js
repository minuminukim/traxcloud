/* ----- ACTION TYPES ----- */
export const LOAD_QUEUE = 'queue/loadQueue';
export const APPEND_QUEUE = 'queue/updateQueue';
export const RESET_QUEUE = 'queue/resetQueue';
export const LOAD_WAVEFORM = 'queue/loadWaveform';
export const REMOVE_WAVEFORM = 'queue/removeWaveform';

/* ----- ACTIONS ----- */
export const setQueue = (tracks) => ({
  type: LOAD_QUEUE,
  tracks,
});

export const updateQueue = (track) => ({
  type: APPEND_QUEUE,
  track,
});

export const resetQueue = () => ({
  type: RESET_QUEUE,
});

export const loadWaveform = (trackId, waveform) => ({
  type: LOAD_WAVEFORM,
  waveform,
  trackId,
});

export const removeWaveform = (trackId) => ({
  type: REMOVE_WAVEFORM,
  trackId,
});
