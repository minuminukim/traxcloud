import {
  COMMENTS_LOADED,
  COMMENT_ADDED,
  COMMENT_UPDATED,
  COMMENT_REMOVED,
} from '../actions/commentActions';

const commentReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENTS_LOADED:
      const comments = action.comments.reduce((acc, comment) => {
        acc[comment.id] = comment;
        return acc;
      }, {});

      return {
        ...state,
        comments,
      };

    case COMMENT_ADDED:
    case COMMENT_UPDATED:
      return {
        ...state,
        [action.comment.id]: action.comment,
      };

    case COMMENT_REMOVED:
      const nextState = { ...state };
      delete nextState[action.commentId];
      return nextState;

    default:
      return state;
  }
};

export default commentReducer;
