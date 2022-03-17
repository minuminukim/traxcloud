import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaCommentAlt } from 'react-icons/fa';
import CommentListItem from '../CommentListItem';

import './CommentsList.css';

const CommentsList = () => {
  const { trackId } = useParams();
  const { commentIds } = useSelector((state) => state.tracks[trackId]);
  const titleText = commentIds?.length === 1 ? 'comment' : 'comments';

  return (
    <div>
      <p className="track-comments-list-title">
        <span className="comment-icon">
          <FaCommentAlt />
        </span>
        {commentIds?.length} {titleText}
      </p>
      <ul className="track-comments-list">
        {commentIds &&
          [...commentIds]
            .sort((a, b) => b - a)
            .map((id) => <CommentListItem key={id} commentId={id} />)}
      </ul>
    </div>
  );
};

export default CommentsList;
