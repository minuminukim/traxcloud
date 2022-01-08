import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import ModalWrapper from '../Modal';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);
  console.log('sessionUser', sessionUser);

  const links = sessionUser ? (
    <ProfileButton user={sessionUser} />
  ) : (
    <>
      <li className="nav-item">
        <ModalWrapper children={<LoginForm />} buttonLabel="Sign In" />
      </li>
      <li className="nav-item">
        <ModalWrapper children={<SignupForm />} buttonLabel="Create account" />
      </li>
    </>
  );

  return (
    <ul className="nav-bar">
      <li className="nav-item">
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      {isLoaded && links}
    </ul>
  );
};

export default Navigation;
