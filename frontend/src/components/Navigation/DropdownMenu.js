import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const DropdownMenu = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    return dispatch(logout());
  };

  return (
    <ul>
      <li>{user.username}</li>
      <li>{user.email}</li>
      <li>
        <button onClick={handleLogout}>Sign out</button>
      </li>
    </ul>
  );
};

export default DropdownMenu;
