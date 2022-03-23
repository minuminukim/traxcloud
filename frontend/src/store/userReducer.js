import { csrfFetch } from './csrf';
import {
  LOAD_TRACKS,
  LOAD_USER_TRACKS,
  ADD_TRACK,
  REMOVE_TRACK,
} from '../actions/trackActions';

import {
  USER_COMMENTS_LOADED,
  COMMENT_ADDED,
  COMMENT_REMOVED,
} from '../actions/commentActions';

const ADD_USER = 'user/loadUser';
const LOAD_USERS = 'user/loadUsers';

const addUser = (user) => ({
  type: ADD_USER,
  user,
});

const loadUsers = (users) => ({
  type: LOAD_USERS,
  users,
});

export const fetchSingleUser = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}`);
  const { user } = await response.json();
  dispatch(addUser(user));

  return user;
};

export const fetchUsers = () => async (dispatch) => {
  const response = await csrfFetch(`/api/users`);
  const { users } = await response.json();
  dispatch(loadUsers(users));

  return users;
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_USERS:
      const users = action.users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});

      return {
        ...state,
        ...users,
      };

    case ADD_USER:
      return {
        ...state,
        [action.user.id]: action.user,
      };

    case LOAD_USER_TRACKS:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          trackIds: action.tracks.map(({ id }) => id).sort((a, b) => b - a),
        },
      };

    case ADD_TRACK:
      const previous = state[action.track.userId]?.trackIds || [];

      return {
        ...state,
        [action.track.userId]: {
          ...state[action.track.userId],
          trackIds: [...previous, action.track.id].sort((a, b) => b - a),
        },
      };

    case REMOVE_TRACK:
      const previousIds = state[action.userId]?.trackIds || [];

      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          trackIds: previousIds.length
            ? previousIds
                .filter((id) => id !== action.trackId)
                .sort((a, b) => b - a)
            : [],
        },
      };

    case USER_COMMENTS_LOADED:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          commentIds: action.comments.map(({ id }) => id).sort((a, b) => b - a),
        },
      };

    case COMMENT_ADDED:
      const prevComments = state[action.comment.userId]?.commentIds || [];

      return {
        ...state,
        [action.comment.userId]: {
          ...state[action.comment.userId],
          commentIds: [...prevComments, action.comment.id].sort(
            (a, b) => b - a
          ),
        },
      };

    case COMMENT_REMOVED:
      const previousComments = state[action.userId]?.commentIds || [];

      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          commentIds: previousComments.length
            ? previousComments
                .filter((id) => id !== action.commentId)
                .sort((a, b) => b - a)
            : [],
        },
      };

    default:
      return state;
  }
};

export default userReducer;
