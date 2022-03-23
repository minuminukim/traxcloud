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
  const { commentIds, commentCount } = useSelector(
    (state) => state.tracks[trackId]
  );

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    return dispatch(fetchCommentsByTrackId(+trackId))
      .then(() => setLoading(false))
      .catch((error) => console.log('error fetching comments', error));
  }, [dispatch, trackId]);

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
          {commentIds &&
            [...commentIds]
              .sort((a, b) => b - a)
              .map((id) => <CommentListItem key={id} commentId={id} />)}
        </ul>
      </div>
    )
  );
};

export default CommentsList;
