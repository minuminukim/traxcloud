import { useSelector } from 'react-redux';
import { onImageError } from '../../../utils';
import './ProfilePicture.css';

const ProfilePicture = ({ userId, size, shape = 'round' }) => {
  const user = useSelector((state) => state.users[userId]);
  const sessionUser = useSelector((state) => state.session.user);
  const isCurrentUser = sessionUser?.id === userId;

  return (
    <img
      className={`profile-picture  profile-picture-${shape} profile-picture-${size}`}
      src={
        isCurrentUser ? sessionUser?.profilePictureUrl : user?.profilePictureUrl
      }
      alt={isCurrentUser ? sessionUser?.displayName : user?.displayName}
      crossOrigin="true"
      onError={onImageError}
    />
  );
};

export default ProfilePicture;
