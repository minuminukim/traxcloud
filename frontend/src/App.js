import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useLocation } from 'react-router-dom';
import { restoreUser } from './store/sessionReducer';
import Navigation from './components/Navigation';
import { LandingNavigation } from './pages/LandingPage';
import GlobalPlayer from './components/GlobalPlayer';
import TrackEditForm from './components/TrackEditForm';
import {
  LandingPage,
  Stream,
  PageNotFound,
  SingleTrackPage,
  TrackUploadForm,
  Profile,
} from './pages';

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
              <Stream />
            </Route>
            <Route exact path="/upload">
              <TrackUploadForm isUpload />
            </Route>
            <Route exact path="/tracks/:trackId">
              <SingleTrackPage />
            </Route>
            <Route exact path="/tracks/:trackId/edit">
              <TrackEditForm />
            </Route>
            <Route exact path="/users/:userId">
              <Profile />
            </Route>
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
        </main>
        <GlobalPlayer />
      </>
    )
  );
}

export default App;
