import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { restoreUser } from './store/session';
import LoginFormModal from './components/LoginFormModal';
import SignupForm from './components/SignupFormModal';
import Navigation from './components/Navigation';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
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
