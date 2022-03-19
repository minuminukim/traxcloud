import { Link } from 'react-router-dom';
import { FaCommentAlt, FaPlay } from 'react-icons/fa';
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

  if (type === 'play') {
    return (
      <span className="ministat">
        <FaPlay className="ministat-icon" />
        <span className="ministat-count">{count}</span>
      </span>
    );
  }
};

export default Ministat;
