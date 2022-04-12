import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { onImageError } from '../../utils';
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

  return (
    <>
      <NavLink className="profile-button nav-item" to={`/users/${user.id}`}>
        <img
          src={profilePictureUrl}
          alt="User avatar"
          className="profile-button-avatar"
          crossOrigin="true"
          onError={onImageError}
        />
        {displayName}
      </NavLink>
    </>
  );
};

export default ProfileButton;
