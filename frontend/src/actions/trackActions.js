import { csrfFetch } from '../store/csrf';

export const LOAD_TRACKS = 'track/loadTracks';
export const ADD_TRACK = 'track/addTrack';
export const UPDATE_TRACK = 'track/updateTrack';
export const REMOVE_TRACK = 'track/removeTrack';

const loadTracks = (tracks) => ({
  type: LOAD_TRACKS,
  tracks,
});

const addTrack = (track) => ({
  type: ADD_TRACK,
  track,
});

const updateTrack = (track) => ({
  type: UPDATE_TRACK,
  track,
});

const removeTrack = (trackId) => ({
  type: REMOVE_TRACK,
  trackId,
});

export const fetchTracks = () => async (dispatch) => {
  const response = await csrfFetch(`/api/tracks`);
  const { tracks } = await response.json();
  dispatch(loadTracks(tracks));

  return tracks;
};

export const fetchUserTracks = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}tracks`);
  const { tracks } = await response.json();
  dispatch(loadTracks(tracks));

  return tracks;
};

export const fetchSingleTrack = (trackId) => async (dispatch) => {
  const response = await csrfFetch(`/api/tracks/${trackId}`);
  const { track } = await response.json();
  dispatch(addTrack(track));

  return track;
};

export const postTrack = (track) => async (dispatch) => {
  const formData = new FormData();
  formData.append('title', track.title);
  formData.append('description', track.description);
  formData.append('artworkUrl', track.artworkUrl);
  formData.append('duration', track.trackDuration);
  formData.append('fileSize', track.fileSize);
  formData.append('userId', track.userId);

  if (track.trackFile) {
    formData.append('trackFile', track.trackFile);
  }

  const response = await csrfFetch('/api/tracks', {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: formData,
  });

  const data = await response.json();
  dispatch(addTrack(data.newTrack));

  return response;
};

export const editTrack = (track) => async (dispatch) => {
  const { id, ...rest } = track;

  const response = await csrfFetch(`/api/tracks/${track.id}`, {
    method: 'PUT',
    body: JSON.stringify({ ...rest }),
  });
  const { updatedTrack } = await response.json();
  dispatch(updateTrack(updatedTrack));

  return response;
};

export const deleteTrack = (trackId, userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/tracks/${trackId}`, {
    method: 'DELETE',
    body: JSON.stringify({ userId, trackId }),
  });

  dispatch(removeTrack(trackId));
  return response;
};
