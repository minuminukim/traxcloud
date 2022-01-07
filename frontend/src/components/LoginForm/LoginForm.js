import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  // TODO: figure out error handling and dispatch
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const response = await dispatch(login({ credential, password }));
  //   if ()
  // };

  return (
    <form>
      <label>
        Username or Email:
        <input
          type="text"
          name="credential"
          id="credential"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <input type="submit" value="Continue" />
    </form>
  );
};

export default LoginForm;
