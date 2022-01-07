import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginForm />
      </Route>
    </Switch>
  );
}

export default App;
