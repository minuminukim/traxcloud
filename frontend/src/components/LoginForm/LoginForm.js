import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  // TODO figure out redirect on first load
  if (sessionUser) {
    return <Redirect to="/" />;
  }

  const handleCredential = (e) => setCredential(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { credential, password };
    const response = await dispatch(login(user));

    if (response && response.errors) {
      setErrors(response.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <label>
        Username or Email:
        <input
          type="text"
          name="credential"
          id="credential"
          value={credential}
          onChange={handleCredential}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
        />
      </label>
      <button type="submit">Continue</button>
    </form>
  );
};

export default LoginForm;
