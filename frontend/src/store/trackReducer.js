import { csrfFetch } from './csrf';

const LOAD_TRACK = 'track/loadTrack';
const LOAD_TRACKS = 'track/loadTracks';

const loadTracks = (tracks) => ({
  type: LOAD_TRACKS,
  tracks,
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
    default:
      return state;
  }
};

export default trackReducer;
