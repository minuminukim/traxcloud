import { csrfFetch } from './csrf';

const LOAD_TRACK = 'track/loadTrack';
const LOAD_TRACKS = 'track/loadTracks';
const SET_TRACK = 'track/addTrack';

const loadTracks = (tracks) => ({
  type: LOAD_TRACKS,
  tracks,
});

const setTrack = (track) => ({
  type: SET_TRACK,
  track,
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
  const { trackFile, title, description, artworkUrl } = track;
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('artworkUrl', artworkUrl);

  if (trackFile) {
    formData.append('trackFile', trackFile);
  }

  try {
    const response = await csrfFetch('/api/tracks', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const { newTrack } = await response.json();
    dispatch(setTrack(newTrack));
    return newTrack;
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
    case SET_TRACK:
      const { track } = action;
      return { ...state, track };
    default:
      return state;
  }
};

export default trackReducer;
