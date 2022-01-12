import { useEffect, useState } from 'react';
import DropdownMenu from './DropdownMenu';
import './ProfileButton.css';
import prefixCORS from '../../utils/prefixCORS';

const ProfileButton = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { profilePictureUrl } = user;

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => setShowMenu(false);
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <>
      <div className="profile-button" onClick={toggleMenu}>
        <img
          src={prefixCORS(profilePictureUrl)}
          alt="Profile photo"
          className="profile-button"
          crossOrigin="true"
        />
      </div>
      {showMenu && <DropdownMenu user={user} />}
    </>
  );
};

export default ProfileButton;
