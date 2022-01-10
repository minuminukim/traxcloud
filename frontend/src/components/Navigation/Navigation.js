import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import ModalWrapper from '../ModalWrapper';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import './Navigation.css';

const Navigation = ({ isLoaded, sessionUser }) => {
  console.log(sessionUser);
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
            <NavLink exact to="/stream">
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
