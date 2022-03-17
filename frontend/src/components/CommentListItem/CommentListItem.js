import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleUser } from '../../store/userReducer';
import ProfilePicture from '../common/ProfilePicture';
import { formatTime, calculateTimeSincePost } from '../../utils';

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
        <ProfilePicture user={user} size="medium" />
        <p>{user.username} <span>at</span> <span>{formatTime(comment.timePosted)}</span></p>
        <p>{comment.body}</p>
        <p>{calculateTimeSincePost(comment.createdAt)}</p>
      </li>
    )
  );
};

export default CommentListItem;
