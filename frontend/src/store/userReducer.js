import { csrfFetch } from "./csrf";

const LOAD_USER = 'track/loadUser';
const LOAD_USERS = 'track/loadUsers';

const loadUser = (userId) => ({
  type: LOAD_USER,
  userId,
})
