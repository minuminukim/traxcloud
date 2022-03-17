import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const CommentsList = () => {
  const { trackId } = useParams();
  const { commentIds } = useSelector((state) => state.tracks[trackId]);
  
  return (
    <ul className="track-comments-list">
      {commentIds &&
        [...commentIds]
          .sort((a, b) => b - a)
          .map((id) => <CommentListItem key={id} commentId={id} />)}
    </ul>
  );
};
