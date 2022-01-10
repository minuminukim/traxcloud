import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { restoreUser } from './store/session';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import SongUploadForm from './components/SongUploadForm';

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
      {!sessionUser && <LandingPage />}
      {isLoaded && (
        <Switch>
          <Route exact path="/stream">
            Stream
          </Route>
          <Route exact path="/upload">
            <SongUploadForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
