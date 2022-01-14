import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BsSoundwave } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { logout } from '../../store/sessionReducer';
import './DropdownMenu.css';

const DropdownMenu = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/');
  };

  return (
    <ul className="dropdown">
      <li className="dropdown-item">
        <FaUser className="nav-icon" />
        Profile
      </li>
      <li className="dropdown-item">
        <BsSoundwave className="nav-icon" />
      </li>
      <li className="dropdown-item">Likes</li>
      <li className="dropdown-item">Stations</li>
      <li className="dropdown-item">Following</li>
      <li className="dropdown-item">Try Pro</li>
      <li className="dropdown-item">Partner offers</li>
      <li>
        <button onClick={handleLogout}>Sign out</button>
      </li>
    </ul>
  );
};

export default DropdownMenu;
