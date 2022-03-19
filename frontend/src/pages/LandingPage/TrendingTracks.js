import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTracks } from '../../actions/trackActions';
import { setQueue } from '../../actions/queueActions';
import PlayableTile from '../../components/PlayableTile';
import SignupForm from '../../components/SignupForm';
import ModalWrapper from '../../components/ModalWrapper';
import './TrendingTracks.css';

const TrendingTracks = () => {
  const dispatch = useDispatch();
  const { queue } = useSelector((state) => state.queue);
  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const tracks = await dispatch(fetchTracks());
        dispatch(setQueue(tracks.slice(0, 6).map(({ id }) => id)));
        setFetching(false);
      } catch (error) {
        console.log('error fetching tracks', error);
      }
    })();
  }, [dispatch]);

  return (
    <div className="trending-tracks">
      <h3 className="trending-tracks-title">
        Hear what's trending for free in the TraxCloud community
      </h3>
      <div className="tracks-container">
        {!isFetching &&
          queue.map((id) => (
            <PlayableTile
              key={id}
              className="trending"
              trackId={id}
              playbackSize="large"
            />
          ))}
      </div>
      <ModalWrapper label="Explore trending tracks" className="large-button">
        <SignupForm />
      </ModalWrapper>
    </div>
  );
};

export default TrendingTracks;
