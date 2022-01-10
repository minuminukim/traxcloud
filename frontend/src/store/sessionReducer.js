import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
  type: SET_USER,
  user,
});

const removeUser = () => ({ type: REMOVE_USER });

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  const user = 'user' in data ? data.user : null;
  dispatch(setUser(user));
  return user;
};

export const login =
  ({ credential, password }) =>
  async (dispatch) => {
    try {
      const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({ credential, password }),
      });
      const { user } = await response.json();
      dispatch(setUser(user));
      return user;
    } catch (error) {
      return await error.json();
    }
  };

export const logout = () => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    const data = await response.json();
    dispatch(removeUser());
    return data;
  } catch (error) {
    return await error.json();
  }
};

export const createUser =
  ({ username, email, password, confirmPassword }) =>
  async (dispatch) => {
    try {
      const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });

      const { user } = await response.json();
      dispatch(setUser(user));
      return user;
    } catch (error) {
      return await error.json();
    }
  };

const sessionReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case SET_USER:
      const { user } = action;
      return { ...state, user };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
