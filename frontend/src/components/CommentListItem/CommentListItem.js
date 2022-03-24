import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleUser } from '../../store/userReducer';
import { deleteComment } from '../../actions/commentActions';
import ProfilePicture from '../common/ProfilePicture';
import { EditDeleteButton } from '../AudioPlayer';
import { formatTime, calculateTimeSincePost } from '../../utils';
import './CommentListItem.css';
import { Link } from 'react-router-dom';

const CommentListItem = ({ commentId }) => {
  const dispatch = useDispatch();
  const comment = useSelector((state) => state.comments[commentId]);
  const user = useSelector((state) => state.users[comment?.userId]);
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoading, setLoading] = useState(true);
  const [showActions, setShowActions] = useState(false);

  // Memoize createdAt value so that it doesn't re-render on hover events
  const createdAt = useMemo(
    () => calculateTimeSincePost(comment?.createdAt),
    [comment]
  );

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }

    dispatch(fetchSingleUser(comment?.userId))
      .then(() => setLoading(false))
      .catch((error) => console.log('error fetching user', error));
  }, [comment?.userId, dispatch, user]);

  const belongsToCurrentUser = sessionUser?.id === comment?.userId;

  const onDelete = () => {
    if (!belongsToCurrentUser) return;

    dispatch(deleteComment(commentId, comment?.trackId, comment?.userId)).catch(
      (error) => console.log('error deleting comment', error)
    );
  };

  return (
    !isLoading && (
      <li
        className={`comment-list-item ${
          belongsToCurrentUser ? 'grey' : 'white'
        }`}
        onMouseOver={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div className="comment-list-item-left">
          <Link to={`/users/${user?.id}`}>
            <ProfilePicture userId={user.id} size="medium" />
          </Link>
        </div>
        <div className="comment-list-item-center">
          <Link className="comment-user-link" to={`/users/${user.id}`}>
            {belongsToCurrentUser ? 'You' : user.displayName}{' '}
          </Link>
          <span className="comment-at">at</span>{' '}
          <span className="comment-time">{formatTime(comment.timePosted)}</span>
          <span className="comment-colon">:</span>
          <p>{comment.body}</p>
        </div>
        <div className="comment-list-item-right">
          <p>{createdAt}</p>
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
