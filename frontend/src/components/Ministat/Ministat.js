import { Link } from 'react-router-dom';
import { FaCommentAlt, FaPlay } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import './Ministat.css';

const Ministat = ({ type, trackId }) => {
  const track = useSelector((state) => state.tracks[trackId]);

  if (type === 'comment') {
    return (
      <Link className="ministat" to={`/tracks/${trackId}`}>
        <FaCommentAlt className="ministat-icon" />
        <span className="ministat-count">{track?.commentCount}</span>
      </Link>
    );
  }

  if (type === 'play') {
    return (
      <span className="ministat">
        <FaPlay className="ministat-icon" />
        <span className="ministat-count">{track?.playCount}</span>
      </span>
    );
  }
};

export default Ministat;
