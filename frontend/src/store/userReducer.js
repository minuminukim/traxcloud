import { csrfFetch } from './csrf';
import { LOAD_TRACKS } from './trackReducer';

const ADD_USER = 'user/loadUser';
const LOAD_USERS = 'user/loadUsers';

const addUser = (user) => ({
  type: ADD_USER,
  user,
});

const loadTracks = (userId, tracks) => ({
  type: LOAD_TRACKS,
  tracks,
  userId,
});

const loadUsers = (users) => ({
  type: LOAD_USERS,
  users,
});

export const getSingleUser = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}`);
  const { user } = await response.json();
  dispatch(addUser(user));

  return user;
};

export const getUserWithTracks = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/tracks`);
  const { user } = await response.json();
  const tracks = user?.Tracks;
  dispatch(loadTracks(user.id, tracks));

  return user;
};

export const getUsers = () => async (dispatch) => {
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
        return user;
      }, {});
      return {
        ...state,
        ...users,
      };
    case ADD_USER:
      return {
        ...state,
        [action.user.id]: {
          ...action.user,
          ...state[action.user.id],
        },
      };
    // case LOAD_TRACKS:
    //   return {
    //     ...state,
    //     [action.userId]: {
    //       ...state[action.userId],
    //       tracks: action.tracks,
    //     },
    //   };
    default:
      return state;
  }
};

export default userReducer;
