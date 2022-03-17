import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useLocation } from 'react-router-dom';
import { restoreUser } from './store/sessionReducer';
import Navigation from './components/Navigation';
import AudioPlayerFooter from './components/AudioPlayerFooter';
// import TrackEditForm from './components/TrackEditForm';
import {
  LandingPage,
  Main,
  PageNotFound,
  SingleTrackPage,
  TrackUploadForm,
} from './pages';
import { LandingNavigation } from './pages/LandingPage';
// import LoginForm from './components/LoginForm';

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  const isLandingPage = !sessionUser && pathname === '/';

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    isLoaded && (
      <>
        {isLandingPage ? <LandingNavigation /> : <Navigation />}
        <main id="content">
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/home">
              <Main />
            </Route>
            <Route exact path="/upload">
              <TrackUploadForm isUpload />
            </Route>
            <Route exact path="/tracks/:trackID">
              <SingleTrackPage />
            </Route>
            <Route exact path="/tracks/:trackID/edit">
              <TrackUploadForm isUpload={false} />
            </Route>
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
        </main>
        <AudioPlayerFooter />
      </>
    )
  );
}

export default App;
