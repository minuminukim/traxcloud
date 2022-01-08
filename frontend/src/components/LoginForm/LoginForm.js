import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import InputField from '../common/InputField';
import FormButton from '../common/Button';
import './LoginForm.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

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
      <FormButton label="Sign In" type="submit" className="form-button" />
    </form>
  );
};

export default LoginForm;
