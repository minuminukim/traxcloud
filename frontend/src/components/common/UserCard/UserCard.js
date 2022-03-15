import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchTracks } from '../../../store/trackReducer';
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
    return dispatch(fetchTracks()).catch((data) => {
      if (data && data.errors) {
        history.push('/error-not-found');
      }
    });
  }, [dispatch, history]);

  return (
    <div className={`user-card user-card-${size}`}>
      <ProfilePicture user={user} size="medium" />
      <div className={`user-card-body-${size}`}>
        <h3 className={`user-card-name`}>{user.displayName}</h3>

        <div className={`user-card-stats`}>
          <div className="icon-wrap">
            <BsSoundwave className="icon-sound" />
          </div>

          <span className="track-count">{userTracks.length}</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
