import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCommentsByTrackId } from '../../actions/commentActions';
import { FaCommentAlt } from 'react-icons/fa';
import CommentListItem from '../CommentListItem';
import './CommentsList.css';

const CommentsList = () => {
  const dispatch = useDispatch();
  const { trackId } = useParams();
  const [isLoading, setLoading] = useState(true);

  const comments = useSelector((state) => state.comments);
  const { comments: commentIds, commentCount } = useSelector(
    (state) => state.tracks[trackId]
  );

  // Checks if every comment is available in store
  const every = commentIds?.every((id) => comments.hasOwnProperty([id]));

  useEffect(() => {
    if (every) {
      setLoading(false);
      return;
    }

    dispatch(fetchCommentsByTrackId(+trackId))
      .then(() => setLoading(false))
      .catch((error) => console.log('error fetching comments', error));
  }, [every, trackId, dispatch]);

  const count = commentCount || 0;
  const titleText = commentCount === 1 ? 'comment' : 'comments';

  return (
    !isLoading && (
      <div>
        <p className="track-comments-list-title">
          <span className="comment-icon">
            <FaCommentAlt />
          </span>
          {count} {titleText}
        </p>
        <ul className="track-comments-list">
          {commentIds?.length > 0 &&
            commentIds.map((id) => <CommentListItem key={id} commentId={id} />)}
        </ul>
      </div>
    )
  );
};

export default CommentsList;
