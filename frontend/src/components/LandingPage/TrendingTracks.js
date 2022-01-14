import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTracks } from '../../store/trackReducer';
import toArray from '../../utils/toArray';
import TrendingBlock from './TrendingBlock';
import Button from '../common/Button';
import './TrendingTracks.css';

const TrendingTracks = () => {
  const dispatch = useDispatch();
  const tracksObject = useSelector((state) => state.tracks);
  const tracks = toArray(tracksObject).slice(0, 6);

  useEffect(() => {
    dispatch(getAllTracks());
  }, [dispatch]);

  return (
    <div className="trending-tracks">
      <h3 className="trending-tracks-title">
        Hear what's trending for free in the TraxCloud community
      </h3>
      <div className="tracks-container">
        {tracks.map((track) => (
          <TrendingBlock key={track.id} track={track} />
        ))}
      </div>
      <Button label="Explore trending tracks" className="large-button" />
    </div>
  );
};

export default TrendingTracks;
