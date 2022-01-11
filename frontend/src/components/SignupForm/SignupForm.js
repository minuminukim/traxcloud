import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../store/sessionReducer';
import InputField from '../common/InputField';
import Button from '../common/Button';
import '../common/Form.css';

const SignupForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleEmail = (e) => setEmail(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      email,
      username,
      password,
      confirmPassword,
    };

    return dispatch(createUser(newUser)).catch(async (response) => {
      const data = await response.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="form-header">Create your TraxCloud account</h2>
      <InputField
        label="Enter your email"
        type="email"
        id="signup-email"
        value={email}
        onChange={handleEmail}
        error={errors.email}
      />
      <InputField
        label="Choose a username"
        type="text"
        id="signup-username"
        value={username}
        onChange={handleUsername}
        error={errors.username}
      />
      <InputField
        label="Choose a password"
        type="password"
        id="signup-password"
        value={password}
        onChange={handlePassword}
        error={errors.password}
      />
      <InputField
        label="Confirm your password"
        type="password"
        id="confirm-password"
        value={confirmPassword}
        onChange={handleConfirmPassword}
        error={errors.confirmPassword}
      />
      <Button
        label="Sign up"
        className="large-button form-button"
        type="submit"
      />
    </form>
  );
};

export default SignupForm;
