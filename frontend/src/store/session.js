import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
  type: SET_USER,
  user,
});

const removeUser = () => ({ type: REMOVE_USER });

export const loginUser = ({ credential, password }) => {
  return async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({
        credential,
        password,
      }),
    });

    if (response.ok) {
      const { user } = await response.json();
      dispatch(setUser(user));
    }

    return response;
  };
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
