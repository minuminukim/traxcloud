import { Link } from 'react-router-dom';
import { FaCommentAlt } from 'react-icons/fa';
import './Ministat.css';

const Ministat = ({ type, count, trackId }) => {
  if (type === 'comment') {
    return (
      <Link className="ministat" to={`/tracks/${trackId}`}>
        <FaCommentAlt className="ministat-icon" />
        <span className="ministat-count">{count}</span>
      </Link>
    );
  }
};

export default Ministat;
