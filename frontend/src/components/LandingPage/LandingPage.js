import Hero from './Hero';
import TrendingTracks from './TrendingTracks';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="page-container">
      <Hero />
      <TrendingTracks />
    </div>
  );
};

export default LandingPage;
