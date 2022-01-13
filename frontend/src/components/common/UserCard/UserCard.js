import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfilePicture from '../ProfilePicture';
import soundGraphic from '../../../assets/images/sound-graphic.png';
import './UserCard.css';

const UserCard = ({ user, size }) => {
  const tracks = user.Tracks;

  return (
    <div className={`user-card user-card-${size}`}>
      <ProfilePicture user={user} size="medium" />
      <div>
        <Link to={`/users/${user.id}/tracks`}>
          <img
            className="icon sound-graphic"
            src={soundGraphic}
            alt="Graphic of sound waves"
          />
        </Link>
        {/* <p className={`track-count track-count-user-${user.id}`}>
          {tracks.length} // TODO get tracks count
        </p> */}
      </div>
    </div>
  );
};

export default UserCard;
