import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
  type: SET_USER,
  user,
});

const removeUser = () => ({ type: REMOVE_USER });

export const login =
  ({ credential, password }) =>
  async (dispatch) => {
    try {
      const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({ credential, password }),
      });
      const { user } = await response.json();
      return dispatch(setUser(user));
    } catch (error) {
      return await error.json();
    }
  };

export const logout = () => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    await response.json();
    return dispatch(removeUser());
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
