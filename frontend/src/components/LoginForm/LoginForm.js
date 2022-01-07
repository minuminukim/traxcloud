import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import InputField from '../common/InputField';
import FormButton from '../common/FormButton';
import './LoginForm.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) {
    return <Redirect to="/" />;
  }

  const updateCredential = (e) => setCredential(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userInput = { credential, password };
    const response = await dispatch(login(userInput));

    if (response && response.errors) {
      return setErrors(response.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <InputField
        id="login-credential"
        placeholder="Your email address or username"
        value={credential}
        onChange={updateCredential}
      />
      <InputField
        id="login-password"
        type="password"
        placeholder="Your Password"
        value={password}
        onChange={updatePassword}
      />
      <FormButton label="Sign In" />
    </form>
  );
};

export default LoginForm;
