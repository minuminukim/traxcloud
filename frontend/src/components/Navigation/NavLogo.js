import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaSoundcloud } from 'react-icons/fa';

const NavLogo = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const link = sessionUser ? '/home' : '/';

  return (
    <li className="nav-item">
      <NavLink to={link} className="nav-link">
        {/* <button className={`nav-logo ${sessionUser && 'transparent'}`}> */}
        <FaSoundcloud />
        {!sessionUser && <span>TRAXCLOUD</span>}
        {/* </button> */}
      </NavLink>
    </li>
  );
};

export default NavLogo;
