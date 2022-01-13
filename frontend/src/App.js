import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { restoreUser } from './store/sessionReducer';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import TrackUploadForm from './components/TrackUploadForm';
import SingleTrackPage from './components/SingleTrackPage';
import Stream from './components/Stream';

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
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            {sessionUser ? <Stream /> : <LandingPage />}
          </Route>
          <Route exact path="/upload">
            <TrackUploadForm sessionUser={sessionUser} />
          </Route>
          <Route path="/tracks/:trackId">
            <SingleTrackPage />
            <Route path="/tracks/:trackId/edit">
              <TrackUploadForm />
            </Route>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
