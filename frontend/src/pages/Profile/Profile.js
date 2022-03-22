import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUser } from '../../store/userReducer';
import { fetchUserTracks } from '../../actions/trackActions';
import { fetchCommentsByUserId } from '../../actions/commentActions';

import { ProfileHeader } from '.';
import AudioPlayer from '../../components/AudioPlayer';
import { setQueue } from '../../actions/queueActions';

function Profile() {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users[userId]);
  const comments = useSelector((state) => state.comments);
  const { queue } = useSelector((state) => state.queue);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Fetch user first to ensure that they are in state
        await dispatch(fetchSingleUser(+userId));
        const [tracks, _comments] = await Promise.all([
          dispatch(fetchUserTracks(+userId)),
          dispatch(fetchCommentsByUserId(+userId)),
        ]);

        if (queue.length === 0) {
          dispatch(setQueue(tracks.map(({ id }) => id).sort((a, b) => b - a)));
        }
      } catch (error) {
        console.log('error fetching user data', error);
      } finally {
        console.log('user', user);
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
          <ul className="profile-stream">
            {user?.trackIds?.map((id) => (
              <li key={id} className="profile-stream-item">
                <AudioPlayer
                  trackId={id}
                  size="medium"
                  withArtwork
                  withHeader
                  withFooter
                  withCommentField
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    )
  );
}

export default Profile;
