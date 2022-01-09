import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import ModalWrapper from '../Modal';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import './Navigation.css';

const Navigation = ({ isLoaded, sessionUser }) => {
  const links = sessionUser ? (
    <ProfileButton user={sessionUser} />
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
    <ul className="nav-bar">
      <li className="nav-item nav-logo">
        <NavLink exact to="/">
          TRAXCLOUD
        </NavLink>
      </li>
      {isLoaded && links}
    </ul>
  );
};

export default Navigation;
