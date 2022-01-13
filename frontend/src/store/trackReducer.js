import { csrfFetch } from './csrf';

const LOAD_TRACKS = 'track/loadTracks';
// const LOAD_TRACK = 'track/loadTrack';
const ADD_TRACK = 'track/addTrack';
const UPDATE_TRACK = 'track/updateTrack';
const REMOVE_TRACK = 'track/removeTrack';

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

export const getAllTracks = () => async (dispatch) => {
  const response = await csrfFetch(`/api/tracks`);
  const { tracks } = await response.json();
  dispatch(loadTracks(tracks));

  return tracks;
};

export const getSingleTrack = (trackId) => async (dispatch) => {
  const response = await csrfFetch(`/api/tracks/${trackId}`);
  const { track } = await response.json();
  dispatch(addTrack(track));
  return track;
};

export const postTrack = (track) => async (dispatch) => {
  console.log('track', track);
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

const trackReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_TRACKS:
      const tracksObject = action.tracks.reduce((acc, track) => {
        acc[track.id] = track;
        return acc;
      }, {});
      return {
        ...state,
        ...tracksObject,
      };
    case ADD_TRACK:
      return {
        ...state,
        [action.track.id]: action.track,
      };
    case UPDATE_TRACK:
      return {
        ...state,
        [action.track.id]: action.track,
      };
    case REMOVE_TRACK:
      const newState = { ...state };
      delete newState[action.trackId];
      return newState;
    default:
      return state;
  }
};

export default trackReducer;
