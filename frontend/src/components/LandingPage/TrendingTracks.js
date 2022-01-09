import TrendingBlock from './TrendingBlock';
import Button from '../common/Button';
import './TrendingTracks.css';

const TrendingTracks = () => {
  return (
    <div className="trending-tracks">
      <h3 className="trending-tracks-title">
        Hear what's trending for free in the TraxCloud community
      </h3>
      <div className="tracks-container">
        <TrendingBlock />
        <TrendingBlock />
        <TrendingBlock />
        <TrendingBlock />
        <TrendingBlock />
        <TrendingBlock />
        <TrendingBlock />
        <TrendingBlock />
        <TrendingBlock />
        <TrendingBlock />
        <TrendingBlock />
        <TrendingBlock />
      </div>
      <Button label="Explore trending tracks" className="large-button" />
    </div>
  );
};

export default TrendingTracks;
