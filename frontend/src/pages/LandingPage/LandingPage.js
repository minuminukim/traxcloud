import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Hero, TrendingTracks } from '.';
import './LandingPage.css';

const LandingPage = () => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (sessionUser) {
      history.push('/home');
    }
  }, [sessionUser]);

  return (
    <div className="page-container landing-page">
      <Hero />
      <TrendingTracks />
    </div>
  );
};

export default LandingPage;
