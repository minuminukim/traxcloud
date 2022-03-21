import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AiOutlineDown } from 'react-icons/ai';
import DropdownMenu from './DropdownMenu';
import prefixCORS from '../../utils/prefixCORS';
import './ProfileButton.css';

const ProfileButton = () => {
  const { user } = useSelector((state) => state.session);
  const [showMenu, setShowMenu] = useState(false);
  const { profilePictureUrl, displayName } = user;

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => setShowMenu(false);
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <>
      {/* <div className="profile-button pointer" onClick={toggleMenu}> */}
      <NavLink className="profile-button nav-item" to={`/users/${user.id}`}>
        <img
          // src={prefixCORS(profilePictureUrl)}
          src={profilePictureUrl}
          alt="Profile photo"
          className="profile-button-avatar"
          crossOrigin="true"
        />
        {displayName}
        {/* <span className="profile-button-username">{displayName}</span> */}
        {/* <AiOutlineDown /> */}
      </NavLink>
      {/* </div> */}
      {/* {showMenu && <DropdownMenu user={user} />} */}
    </>
  );
};

export default ProfileButton;
