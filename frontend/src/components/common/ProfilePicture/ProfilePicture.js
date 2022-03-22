import { useSelector } from 'react-redux';
import { onImageError } from '../../../utils';
import './ProfilePicture.css';

const ProfilePicture = ({ userId, size, shape = 'round' }) => {
  const user = useSelector((state) => state.users[userId]);

  return (
    <img
      className={`profile-picture  profile-picture-${shape} profile-picture-${size}`}
      src={user?.profilePictureUrl}
      alt={user?.displayName}
      crossOrigin="true"
      onError={onImageError}
    />
  );
};

export default ProfilePicture;
