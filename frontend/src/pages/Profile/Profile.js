import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUser } from '../../store/userReducer';

import { ProfileHeader } from '.';
import AudioPlayer from '../../components/AudioPlayer';
import PlayersList from '../../components/PlayersList';

function Profile() {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users[userId]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        await dispatch(fetchSingleUser(+userId));
      } catch (error) {
        console.log(`error fetching user ${userId} in Profile`, error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, userId]);

  return (
    !isLoading && (
      <div className="page-container profile">
        <ProfileHeader />
        <section className="profile-main">
          <h2 className="profile-section-heading">Recent</h2>
          <PlayersList
            tracks={user?.tracks}
            queueType={`user-${userId}`}
            listClassName="profile-stream"
            itemClassName="profile-stream-item"
          />
        </section>
      </div>
    )
  );
}

export default Profile;
