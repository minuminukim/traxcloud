import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputField from '../common/InputField';
import FormButton from '../common/FormButton';

const SignupForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (session)

  const updateEmail = (e) => setEmail(e.target.value);
  const updateUsername = (e) => setUsername(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateConfirmPassword = (e) => setConfirmPassword(e.target.value);

  return (
    <form>
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
      <FormButton label="Sign up" />
    </form>
  );
};

export default SignupForm;
