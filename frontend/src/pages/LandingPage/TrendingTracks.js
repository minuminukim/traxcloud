import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTracks } from '../../store/trackReducer';
import toArray from '../../utils/toArray';
import TrendingBlock from './TrendingBlock';
import PlayableTile from '../../components/PlayableTile';
import SignupForm from '../../components/SignupForm';
import ModalWrapper from '../../components/ModalWrapper';
import './TrendingTracks.css';

const TrendingTracks = () => {
  const dispatch = useDispatch();
  const tracksObject = useSelector((state) => state.tracks);
  const tracks = toArray(tracksObject).slice(0, 6);

  useEffect(() => {
    dispatch(fetchTracks());
  }, [dispatch]);

  return (
    <div className="trending-tracks">
      <h3 className="trending-tracks-title">
        Hear what's trending for free in the TraxCloud community
      </h3>
      <div className="tracks-container">
        {tracks.map((track) => (
          <PlayableTile
            className="trending"
            trackId={track.id}
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
