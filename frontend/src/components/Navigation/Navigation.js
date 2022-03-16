import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaSoundcloud } from 'react-icons/fa';
import { ProfileButton, UnauthenticatedLinks } from '.';
import ModalWrapper from '../ModalWrapper';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import './Navigation.css';

const Navigation = () => {
  const sessionUser = useSelector((state) => state.session.user);

  const unauthenticatedLogo = (
    <li className="nav-item">
      <NavLink to="/" className="nav-link" activeClassName="selected">
        <div className="nav-logo transparent">
          <FaSoundcloud className="nav-logo-icon transparent" />
          <h1 className="landing-heading">TRAXCLOUD</h1>
        </div>
      </NavLink>
    </li>
  );

  const sessionLinks = sessionUser ? (
    <div className="main-nav-right">
      <li className="nav-item">
        <NavLink
          className="nav-link"
          exact
          to="/upload"
          activeClassName="selected"
        >
          Upload
        </NavLink>
      </li>
      <li className="nav-item">
        <ProfileButton user={sessionUser} />
      </li>
    </div>
  ) : (
    <div className="right">
      <li className="nav-item">
        <ModalWrapper
          children={<LoginForm />}
          label="Sign In"
          className="nav-button transparent"
        />
      </li>
      <li className="nav-item">
        <ModalWrapper
          children={<SignupForm />}
          label="Create account"
          className="nav-button"
        />
      </li>
    </div>
  );

  return (
    <nav className="nav-bar nav-main">
      <ul className="nav-left">
        <li className="nav-item">
          <NavLink exact to="/" className="nav-link" activeClassName="selected">
            <div className="nav-logo">
              <FaSoundcloud />
            </div>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact to="/" activeClassName="selected">
            Home
          </NavLink>
        </li>
        <li className="nav-item">Stream</li>
        <li className="nav-item">Library</li>
      </ul>
      <ul className="nav-right">{sessionLinks}</ul>
    </nav>
  );
};

export default Navigation;
