import { csrfFetch } from './csrf';
import mapAndSortIDs from '../utils/mapAndSortIDs';

import {
  LOAD_USER_TRACKS,
  ADD_TRACK,
  REMOVE_TRACK,
} from '../actions/trackActions';

// import {
//   USER_COMMENTS_LOADED,
//   COMMENT_ADDED,
//   COMMENT_REMOVED,
// } from '../actions/commentActions';

const ADD_USER = 'user/loadUser';

const addUser = (user) => ({
  type: ADD_USER,
  user,
});

export const fetchSingleUser = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}`);
  const { user } = await response.json();
  dispatch(addUser(user));

  return user;
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_USER:
      const user = {
        ...action.user,
        tracks: mapAndSortIDs(action.user.tracks),
        comments: mapAndSortIDs(action.user.comments),
      };
      return {
        ...state,
        [action.user.id]: user,
      };

    case LOAD_USER_TRACKS:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          tracks: mapAndSortIDs(action.tracks),
        },
      };

    case ADD_TRACK:
      const previous = state[action.track.userId]?.tracks || [];
      const inPrevious = previous.includes(action.track.id);

      return {
        ...state,
        [action.track.userId]: {
          ...state[action.track.userId],
          trackCount: state[action.track.userId].trackCount + 1,
          tracks: inPrevious
            ? [...previous]
            : [...previous, action.track.id].sort((a, b) => b - a),
        },
      };

    case REMOVE_TRACK:
      const previousIds = state[action.userId]?.tracks || [];

      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          tracks: previousIds.length
            ? previousIds
                .filter((id) => id !== action.trackId)
                .sort((a, b) => b - a)
            : [],
        },
      };

    // case USER_COMMENTS_LOADED:
    //   return {
    //     ...state,
    //     [action.userId]: {
    //       ...state[action.userId],
    //       commentIds: action.comments.map(({ id }) => id).sort((a, b) => b - a),
    //     },
    //   };

    // case COMMENT_ADDED:
    //   const prevComments = state[action.comment.userId]?.commentIds || [];

    //   return {
    //     ...state,
    //     [action.comment.userId]: {
    //       ...state[action.comment.userId],
    //       commentIds: [...prevComments, action.comment.id].sort(
    //         (a, b) => b - a
    //       ),
    //     },
    //   };

    // case COMMENT_REMOVED:
    //   const previousComments = state[action.userId]?.commentIds || [];

    //   return {
    //     ...state,
    //     [action.userId]: {
    //       ...state[action.userId],
    //       commentIds: previousComments.length
    //         ? previousComments
    //             .filter((id) => id !== action.commentId)
    //             .sort((a, b) => b - a)
    //         : [],
    //     },
    //   };

    default:
      return state;
  }
};

export default userReducer;
