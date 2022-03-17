import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentListItem from '../CommentListItem';
import './CommentsList.css';

const CommentsList = () => {
  const { trackId } = useParams();
  const { commentIds } = useSelector((state) => state.tracks[trackId]);

  return (
    <div>
      <p>{commentIds?.length} comments</p>
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
