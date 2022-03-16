import { NavLink } from 'react-router-dom';
import { FaSoundcloud } from 'react-icons/fa';
import { UnauthenticatedLinks, NavLogo } from '../../components/Navigation';

const LandingNavigation = () => {
  return (
    <nav className="nav-bar nav-transparent landing">
      <ul className="nav-links landing-links-left">
        <NavLogo />
      </ul>
      <UnauthenticatedLinks />
    </nav>
  );
};

export default LandingNavigation;
