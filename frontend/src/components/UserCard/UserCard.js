import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleUser } from '../../store/userReducer';
import ProfilePicture from '../common/ProfilePicture';
import './UserCard.css';

const UserCard = ({ userId, size, avatarSize }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users[userId]);

  useEffect(() => {
    if (!user?.displayName) {
      dispatch(fetchSingleUser(userId)).catch((error) =>
        console.log('error fetching user', error)
      );
    }
  }, [user?.displayName, userId, dispatch]);

  return !user ? null : (
    <div className={`user-card user-card-${size}`}>
      <Link to={`/users/${userId}`}>
        <ProfilePicture userId={userId} size={avatarSize} />
      </Link>
      <div className={`user-card-body-${size}`}>
        <Link className="user-card-name" to={`/users/${userId}`}>
          {user?.displayName}
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
