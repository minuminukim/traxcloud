import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineDown } from 'react-icons/ai';
import DropdownMenu from './DropdownMenu';
import prefixCORS from '../../utils/prefixCORS';
import './ProfileButton.css';

const ProfileButton = () => {
  const { user } = useSelector((state) => state.session);
  const [showMenu, setShowMenu] = useState(false);
  const { profilePictureUrl, username } = user;

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => setShowMenu(false);
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <>
      <div className="profile-button pointer" onClick={toggleMenu}>
        <img
          src={prefixCORS(profilePictureUrl)}
          alt="Profile photo"
          className="profile-button-avatar"
          crossOrigin="true"
        />
        <span className="profile-button-username">{username}</span>
        <AiOutlineDown />
      </div>
      {showMenu && <DropdownMenu user={user} />}
    </>
  );
};

export default ProfileButton;
