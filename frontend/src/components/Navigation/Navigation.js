import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ProfileButton, UnauthenticatedLinks, NavLogo } from '.';
import './Navigation.css';

const Navigation = () => {
  const sessionUser = useSelector((state) => state.session.user);

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
          <li className="nav-item">Stream</li>
          <li className="nav-item">Library</li>
        </ul>
        {sessionUser ? sessionLinks : <UnauthenticatedLinks />}
      </nav>
    </header>
  );
};

export default Navigation;
