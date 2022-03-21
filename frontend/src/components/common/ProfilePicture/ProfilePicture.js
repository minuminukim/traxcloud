import './ProfilePicture.css';
import { onImageError } from '../../../utils';

const ProfilePicture = ({ user, size, shape = 'round' }) => {
  return (
    <img
      className={`profile-picture  profile-picture-${shape} profile-picture-${size} user-${user.id}`}
      src={user.profilePictureUrl}
      alt={user.displayName}
      crossOrigin="true"
      onError={onImageError}
    />
  );
};

export default ProfilePicture;
