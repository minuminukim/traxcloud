import { csrfFetch } from '../store/csrf';

/* ----- ACTION TYPES ----- */
export const COMMENTS_LOADED = 'comments/commentsLoaded';
export const COMMENT_ADDED = 'comments/commentAdded';
export const COMMENT_UPDATED = 'comments/commentUpdated';
export const COMMENT_REMOVED = 'comments/commentRemoved';

/* ----- ACTIONS ----- */
const loadComments = (comments) => ({
  type: COMMENTS_LOADED,
  comments,
});

const addComment = (comment) => ({
  type: COMMENT_ADDED,
  comment,
});

const updateComment = (comment) => ({
  type: COMMENT_UPDATED,
  comment,
});

const removeComment = (commentId) => ({
  type: COMMENT_REMOVED,
  commentId,
});

/* ----- THUNKS ----- */
export const fetchComments = () => async (dispatch) => {
  const response = await csrfFetch('/api/comments');
  const { comments } = await response.json();
  dispatch(loadComments(comments));

  return comments;
};

export const postComment = (formData) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments`, {
    method: 'POST',
    body: JSON.stringify(formData),
  });
  const { comment } = await response.json();
  dispatch(addComment(comment));

  return comment;
};

export const editComment = (comment) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${comment.id}`, {
    method: 'PUT',
    body: JSON.stringify(comment),
  });
  const data = await response.json();
  dispatch(updateComment(data.comment));

  return data.comment;
};

export const deleteComment = (commentId) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
  });
  dispatch(removeComment(commentId));
  return response;
};
