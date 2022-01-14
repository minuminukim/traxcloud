import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getAllTracks } from '../../../store/trackReducer';
import { BsSoundwave } from 'react-icons/bs';
import ProfilePicture from '../ProfilePicture';
import './UserCard.css';

const UserCard = ({ user, size }) => {
  const dispatch = useDispatch();
  const tracks = useSelector((state) => state.tracks);
  const history = useHistory();
  const userTracks = Object.values(tracks).filter((track) => {
    return track.userId === user.id;
  });

  useEffect(() => {
    return dispatch(getAllTracks()).catch((data) => {
      if (data && data.errors) {
        history.push('/error-not-found');
      }
    });
  }, [dispatch]);

  return (
    <div className={`user-card user-card-${size}`}>
      <ProfilePicture user={user} size="medium" />
      <div className={`user-card-body-${size}`}>
        {/* <Link className="user-card-link" to={`/users/${user.id}`}> */}
          <h3 className={`user-card-name`}>{user.displayName}</h3>
        {/* </Link> */}
        <div className={`user-card-stats`}>
          <div className="icon-wrap">
            <BsSoundwave className="icon-sound" />
          </div>
          {/* <Link className="track-count" to={`/users/${user.id}/tracks`}> */}
           <span className="track-count">{userTracks.length}</span>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
