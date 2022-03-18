import { Link } from 'react-router-dom';
import { FaCommentAlt } from 'react-icons/fa';

const Ministat = ({ type, count, trackId }) => {
  if (type === 'comment') {
    return (
      <Link to={`/tracks/${trackId}`}>
        <FaCommentAlt />
        {count}
      </Link>
    );
  }
};

export default Ministat;
