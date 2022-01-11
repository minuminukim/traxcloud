import { csrfFetch } from './csrf';

const LOAD_TRACKS = 'track/loadTracks';
const ADD_TRACK = 'track/addTrack';
const REMOVE_TRACK = 'track/removeTrack';

const loadTracks = (tracks) => ({
  type: LOAD_TRACKS,
  tracks,
});

const addTrack = (track) => ({
  type: ADD_TRACK,
  track,
});

const removeTrack = (trackId) => ({
  type: REMOVE_TRACK,
  trackId,
});

export const getAllTracks = () => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/tracks');
    const { tracks } = await response.json();
    dispatch(loadTracks(tracks));
    return tracks;
  } catch (error) {
    return await error.json();
  }
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

  try {
    const response = await csrfFetch('/api/tracks', {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: formData,
    });
    const { newTrack } = await response.json();
    dispatch(addTrack(newTrack));
    return newTrack;
  } catch (error) {
    return await error.json();
  }
};

export const deleteTrack = (trackId, userId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/tracks/${trackId}`, {
      method: 'DELETE',
      body: JSON.stringify({ userId, trackId }),
    });
    const { message } = await response.json();
    dispatch(removeTrack(trackId));
    return message;
  } catch (error) {
    return await error.json();
  }
};

const trackReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_TRACKS:
      const { tracks } = action;
      const tracksObject = tracks.reduce((acc, track) => {
        acc[track.id] = track;
        return acc;
      }, {});
      return {
        ...state,
        ...tracksObject,
      };
    case ADD_TRACK:
      const { track } = action;
      return { ...state, track };
    case REMOVE_TRACK:
      const newState = { ...state };
      delete newState[action.trackId];
      return newState;
    default:
      return state;
  }
};

export default trackReducer;
