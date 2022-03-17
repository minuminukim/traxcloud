import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleUser } from '../../store/userReducer';
import { deleteComment } from '../../actions/commentActions';
import ProfilePicture from '../common/ProfilePicture';
import { EditDeleteButton } from '../AudioPlayer';
import { formatTime, calculateTimeSincePost } from '../../utils';
import './CommentListItem.css';

const CommentListItem = ({ commentId }) => {
  const dispatch = useDispatch();
  const comment = useSelector((state) => state.comments[commentId]);
  const user = useSelector((state) => state.users[comment?.userId]);
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoading, setLoading] = useState(true);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (user) {
      setLoading(false);
      return;
    }

    return dispatch(getSingleUser(comment.userId))
      .then(() => setLoading(true))
      .catch((error) => console.log('error fetching user', error));
  }, [user, dispatch]);

  const belongsToCurrentUser = sessionUser?.id === comment.userId;

  const toggleActions = () => setShowActions(!showActions);
  const onDelete = () => {
    if (!belongsToCurrentUser) return;
    return dispatch(deleteComment(commentId, comment.trackId)).catch((error) =>
      console.log('error deleting comment', error)
    );
  };

  return (
    !isLoading && (
      <li
        className="comment-list-item"
        onMouseEnter={toggleActions}
        onMouseLeave={toggleActions}
      >
        <div className="comment-list-item-left">
          <ProfilePicture user={user} size="medium" />
        </div>
        <div className="comment-list-item-center">
          <p>
            {user.username} <span>at</span>{' '}
            <span>{formatTime(comment.timePosted)}</span>
          </p>
          <p>{comment.body}</p>
        </div>
        <div className="comment-list-item-right">
          <p>{calculateTimeSincePost(comment.createdAt)}</p>
          {belongsToCurrentUser && showActions && (
            <div className="comment-list-item-actions">
              <EditDeleteButton
                isEdit={false}
                className="delete-button"
                withText={false}
                onClick={onDelete}
              />
            </div>
          )}
        </div>
      </li>
    )
  );
};

export default CommentListItem;
