/* ----- ACTION TYPES ----- */
export const LOAD_QUEUE = 'queue/loadQueue';
export const APPEND_QUEUE = 'queue/updateQueue';
export const RESET_QUEUE = 'queue/resetQueue';

/* ----- ACTIONS ----- */
export const setQueue = (tracks, queueId, trackId) => ({
  type: LOAD_QUEUE,
  tracks,
  queueId,
  trackId,
});

export const updateQueue = (track) => ({
  type: APPEND_QUEUE,
  track,
});

export const resetQueue = () => ({
  type: RESET_QUEUE,
});
