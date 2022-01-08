import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import ModalWrapper from '../Modal';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);
  console.log('sessionUser', sessionUser);

  const links = sessionUser ? (
    <ProfileButton user={sessionUser} />
  ) : (
    <>
      <li>
        <ModalWrapper children={<LoginForm />} buttonLabel="Sign In" />
      </li>
      <li>
        <ModalWrapper children={<SignupForm />} buttonLabel="Sign Up" />
      </li>
    </>
  );

  return (
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      {isLoaded && links}
    </ul>
  );
};

export default Navigation;
