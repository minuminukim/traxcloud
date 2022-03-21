import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProfilePicture from '../../components/common/ProfilePicture';
import Overlay from '../../components/Overlay';
import './Profile.css';

function ProfileHeader() {
  const { userId } = useParams();
  const user = useSelector((state) => state.users[userId]);

  return (
    <div className="profile-header">
      <Overlay
        style={{ backgroundImage: `url(${user.profilePictureUrl})` }}
        className="absolute blur"
      />
      <div className="profile-header-avatar">
        <ProfilePicture user={user} size="200" shape="round" />
      </div>
      <div className="profile-header-heading">
        <h1 className="profile-heading">{user.displayName}</h1>
      </div>
    </div>
  );
}

export default ProfileHeader;
