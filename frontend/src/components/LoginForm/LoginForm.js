import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { useDemo } from '../../hooks';
import { login } from '../../store/sessionReducer';
import InputField from '../common/InputField';
import Button from '../common/Button';
import '../common/Form.css';

const LoginForm = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const loginDemoUser = useDemo();

  const updateCredential = (e) => setCredential(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    dispatch(login({ credential, password }))
      .then(() => {
        if (pathname === '/') {
          history.push('/home');
        }
      })
      .catch(async (response) => {
        const data = await response.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <InputField
        id="login-credential"
        placeholder="Your email address or username"
        value={credential}
        onChange={updateCredential}
        error={errors.credential}
      />
      <InputField
        id="login-password"
        type="password"
        placeholder="Your password"
        value={password}
        onChange={updatePassword}
        error={errors.password}
      />
      <Button
        label="Sign In"
        className="large-button form-button"
        type="submit"
      />
      <Button
        label="Sign In As Demo"
        className="large-button form-button"
        onClick={loginDemoUser}
      />
    </form>
  );
};

export default LoginForm;
