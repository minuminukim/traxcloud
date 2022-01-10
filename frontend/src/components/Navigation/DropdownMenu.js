import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/sessionReducer';
import sanitizeString from '../../utils/sanitizeString';

const DropdownMenu = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    return dispatch(logout());
  };

  const userSegment = sanitizeString(user.username);

  return (
    <ul className="dropdown">
      <li className="dropdown-item">
        <NavLink className="dropdown-link" exact to={userSegment}>
          Profile
        </NavLink>
        <NavLink className="dropdown-link" exact to={`${userSegment}/tracks`}>
          Tracks
        </NavLink>
      </li>
      <li>{user.email}</li>
      <li>
        <button onClick={handleLogout}>Sign out</button>
      </li>
    </ul>
  );
};

export default DropdownMenu;
