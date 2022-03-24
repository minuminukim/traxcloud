import {
  LOAD_TRACKS,
  LOAD_USER_TRACKS,
  ADD_TRACK,
  UPDATE_TRACK,
  REMOVE_TRACK,
} from '../actions/trackActions';

import {
  COMMENTS_LOADED,
  COMMENT_ADDED,
  COMMENT_REMOVED,
} from '../actions/commentActions';

import { PLAYER_LOADING, PLAYER_READY } from '../actions/playerActions';

const trackReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_TRACKS:
    case LOAD_USER_TRACKS:
      const tracksObject = action.tracks.reduce((acc, track) => {
        acc[track.id] = track;
        acc[track.id].comments = track?.comments.map(({ id }) => id) || [];
        return acc;
      }, {});

      return {
        ...state,
        ...tracksObject,
      };

    case ADD_TRACK:
      return {
        ...state,
        [action.track.id]: { ...state.track?.id, ...action.track },
      };

    case UPDATE_TRACK:
      // const previousCommentIds = state[action.track.id]?. || [];
      return {
        ...state,
        [action.track.id]: {
          ...state.track?.id,
          ...action.track,
          // commentIds: previousCommentIds,
        },
      };

    case REMOVE_TRACK:
      const newState = { ...state };
      delete newState[action.trackId];
      return newState;

    case PLAYER_LOADING:
      return {
        ...state,
        [action.trackId]: {
          ...state[action.trackId],
          playerLoading: true,
        },
      };

    case PLAYER_READY:
      return {
        ...state,
        [action.trackId]: {
          ...state[action.trackId],
          playerLoading: false,
        },
      };

    case COMMENTS_LOADED:
      const commentIds = action.comments
        .filter((comment) => comment.trackId === action.trackId)
        .map(({ id }) => id);

      return {
        ...state,
        [action.trackId]: {
          ...state[action.trackId],
          comments: commentIds,
        },
      };

    case COMMENT_ADDED:
      const prevCommentIds = state[action.comment.trackId].comments || [];
      const prevCount = state[action.comment.trackId].commentCount;

      return {
        ...state,
        [action.comment.trackId]: {
          ...state[action.comment.trackId],
          commentCount: prevCount + 1,
          comments: [...prevCommentIds, action.comment.id],
        },
      };

    case COMMENT_REMOVED:
      const prevComments = state[action.trackId].comments;
      const filtered = prevComments.filter((id) => id !== action.commentId);

      return {
        ...state,
        [action.trackId]: {
          ...state[action.trackId],
          comments: filtered,
          commentCount: filtered.length,
        },
      };

    default:
      return state;
  }
};

export default trackReducer;
