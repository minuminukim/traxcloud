import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { restoreUser } from './store/session';
import SignupForm from './components/SignupForm';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';

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
          <Route path="/signup">
            <SignupForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
