import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../store/session';
import InputField from '../common/InputField';
import Button from '../common/Button';

const SignupForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const updateEmail = (e) => setEmail(e.target.value);
  const updateUsername = (e) => setUsername(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userInput = {
      email,
      username,
      password,
    };

    const response = await dispatch(createUser(userInput));

    if (response && response.errors) {
      setErrors(response.errors);
    }

    if (password !== confirmPassword) {
      setErrors((prevErrors) => [
        ...prevErrors,
        'Please make sure your passwords match.',
      ]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.length > 0 &&
          errors.map((error) => <li key={error}>{error}</li>)}
      </ul>
      <InputField
        label="Enter your email"
        type="email"
        id="signup-email"
        value={email}
        onChange={updateEmail}
      />
      <InputField
        label="Choose a username"
        type="text"
        id="signup-username"
        value={username}
        onChange={updateUsername}
      />
      <InputField
        label="Choose a password"
        type="password"
        id="signup-password"
        value={password}
        onChange={updatePassword}
      />
      <InputField
        label="Confirm your password"
        type="password"
        id="confirm-password"
        value={confirmPassword}
        onChange={updateConfirmPassword}
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
