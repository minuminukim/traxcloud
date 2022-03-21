import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfilePicture from '../common/ProfilePicture';
import './UserCard.css';

const UserCard = ({ userId, size, avatarSize }) => {
  const user = useSelector((state) => state.users[userId]);

  return (
    <div className={`user-card user-card-${size}`}>
      <Link to={`/users/${userId}`}>
        <ProfilePicture user={user} size={avatarSize} />
      </Link>
      <div className={`user-card-body-${size}`}>
        <Link className="user-card-name" to={`/users/${userId}`}>
          {user.displayName}
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
