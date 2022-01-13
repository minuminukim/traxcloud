import { csrfFetch } from './csrf';

const ADD_USER = 'track/loadUser';
const LOAD_USERS = 'track/loadUsers';

const addUser = (userId) => ({
  type: ADD_USER,
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
        [action.user.id]: action.user,
      };
    default:
      return state;
  }
};

export default userReducer;
