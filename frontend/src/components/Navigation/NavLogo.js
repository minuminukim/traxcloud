import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaSoundcloud } from 'react-icons/fa';

const NavLogo = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const link = sessionUser ? '/home' : '/';

  return (
    <li className="nav-item logo">
      <NavLink to={link} className="nav-link logo">
        <FaSoundcloud className="nav-logo" />
        <span className="nav-logo-text">TRAXCLOUD</span>
      </NavLink>
    </li>
  );
};

export default NavLogo;
