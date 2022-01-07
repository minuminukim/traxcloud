import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);
  console.log('sessionUser', sessionUser);

  const links = sessionUser ? (
    <ProfileButton user={sessionUser} />
  ) : (
    <>
      <li>
        <LoginFormModal />
      </li>
      <li>
        <NavLink to="/signup">Sign Up</NavLink>
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
