import { UnauthenticatedLinks, NavLogo } from '../../components/Navigation';

const LandingNavigation = () => {
  return (
    <header className="header transparent">
      <nav className="nav-bar nav-transparent landing">
        <ul className="nav-links landing-links-left">
          <NavLogo />
        </ul>
        <UnauthenticatedLinks />
      </nav>
    </header>
  );
};

export default LandingNavigation;
