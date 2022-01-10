import Hero from './Hero';
import TrendingTracks from './TrendingTracks';
import SongUploadForm from '../SongUploadForm';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="page-container">
      <Hero />
      <TrendingTracks />
      <SongUploadForm />
    </div>
  );
};

export default LandingPage;
