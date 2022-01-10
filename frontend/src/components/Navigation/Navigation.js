import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import ModalWrapper from '../ModalWrapper';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import './Navigation.css';

const Navigation = ({ isLoaded, sessionUser }) => {
  const sessionLinks = sessionUser ? (
    <>
      <li className="nav-item">
        <NavLink exact to="/upload">
          Upload
        </NavLink>
      </li>
      <li className="nav-item">
        <ProfileButton user={sessionUser} />
      </li>
    </>
  ) : (
    <>
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
    </>
  );

  const links = sessionUser ? (
    <>
      <NavLink exact to="/upload">
        Upload
      </NavLink>
      <ProfileButton user={sessionUser} />
    </>
  ) : (
    <div className="nav-right">
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
    <nav className="nav-bar">
      <ul className="nav-left">
        <li className="nav-item nav-logo">
          <NavLink exact to="/">
            TRAXCLOUD
          </NavLink>
        </li>
        {sessionUser && (
          <li className="nav-item">
            <NavLink exact to="/">
              Stream
            </NavLink>
          </li>
        )}
      </ul>
      <ul className="nav-right">{isLoaded && sessionLinks}</ul>
    </nav>
  );
};

export default Navigation;
