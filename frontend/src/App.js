import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { restoreUser } from './store/sessionReducer';
import Navigation from './components/Navigation';
import AudioPlayerFooter from './components/AudioPlayerFooter';
import TrackEditForm from './components/TrackEditForm';
import {
  LandingPage,
  Main,
  PageNotFound,
  SingleTrackPage,
  TrackUploadForm,
} from './pages';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} sessionUser={sessionUser} />
      <div id="content">
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              {sessionUser ? <Main /> : <LandingPage />}
            </Route>
            <Route exact path="/upload">
              <TrackUploadForm sessionUser={sessionUser} />
            </Route>
            <Route path="/tracks/:trackID">
              <SingleTrackPage />
            </Route>
            <Route exact path="/tracks/:trackID/edit">
              <TrackEditForm />
            </Route>
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
        )}
      </div>
      <AudioPlayerFooter />
    </>
  );
}

export default App;
