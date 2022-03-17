import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleUser } from '../../store/userReducer';
import ProfilePicture from '../common/ProfilePicture';
import { formatTime, calculateTimeSincePost } from '../../utils';
import './CommentListItem.css';

const CommentListItem = ({ commentId }) => {
  const dispatch = useDispatch();
  const comment = useSelector((state) => state.comments[commentId]);
  const user = useSelector((state) => state.users[comment?.userId]);
  const [isLoading, setLoading] = useState(true);

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

  return (
    !isLoading && (
      <li className="comment-list-item">
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
        </div>
      </li>
    )
  );
};

export default CommentListItem;
