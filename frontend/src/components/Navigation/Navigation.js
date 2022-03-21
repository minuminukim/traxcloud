import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { logout } from '../../store/sessionReducer';
import { ProfileButton, UnauthenticatedLinks, NavLogo } from '.';
import Button from '../common/Button';
import './Navigation.css';

const Navigation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  const sessionLinks = (
    <div className="nav-main-right">
      <li className="upload-button">
        <NavLink className="nav-link" exact to="/upload">
          Upload
        </NavLink>
      </li>
      <li className="nav-item-dropdown">
        <ProfileButton user={sessionUser} />
      </li>
      <li className="nav-item pointer signout" onClick={handleLogout}>
        Sign out
      </li>
    </div>
  );

  return (
    <header className="header header-main">
      <nav className="nav-bar nav-main">
        <ul className="nav-main-left">
          <NavLogo />
          <li className="nav-item">
            <NavLink exact to="/home">
              Home
            </NavLink>
          </li>
          {/* <li className="nav-item">Stream</li> */}
          {/* <li className="nav-item">Library</li> */}
        </ul>
        {sessionUser ? sessionLinks : <UnauthenticatedLinks />}
      </nav>
    </header>
  );
};

export default Navigation;
