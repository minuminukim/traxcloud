import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../store/sessionReducer';
import InputField from '../common/InputField';
import Button from '../common/Button';
import '../common/Form.css';

const LoginForm = () => {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  const updateCredential = (e) => setCredential(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(login({ credential, password })).catch(async (response) => {
      const data = await response.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
};

export default LoginForm;
