import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProfilePicture from '../../components/common/ProfilePicture';

function ProfileHeader() {
  const { userId } = useParams();
  const user = useSelector((state) => state.users[userId]);

  return (
    <div className="profile-header">
      <div>
        <ProfilePicture user={user} size="large" shape="round" />
      </div>
      <div>
        <h1 className="profile-heading">{user.displayName}</h1>
      </div>
    </div>
  );
}

export default ProfileHeader;
