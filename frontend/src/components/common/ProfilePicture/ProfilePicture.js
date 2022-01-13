import { Link } from 'react-router-dom';
import './ProfilePicture.css';

const ProfilePicture = ({ user, size }) => {
  return (
    <Link to={`/users/${user.id}`}>
      <img
        className={`profile-picture  profile-picture-${size} user-${user.id}`}
        src={user.profilePictureUrl}
        alt={user.displayName}
        crossOrigin="true"
      />
    </Link>
  );
};

export default ProfilePicture;
