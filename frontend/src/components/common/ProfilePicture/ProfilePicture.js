// import { Link } from 'react-router-dom';
import './ProfilePicture.css';

const ProfilePicture = ({ user, size }) => {
  return (
    <img
      className={`profile-picture  profile-picture-${size} user-${user.id}`}
      src={user.profilePictureUrl}
      alt={user.displayName}
      crossOrigin="true"
    />
    // <Link to={`/users/${user.id}`}>
    // </Link>
  );
};

export default ProfilePicture;
