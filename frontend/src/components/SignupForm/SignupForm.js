import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const SignupForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const updateEmail = (e) => setEmail(e.target.value);
  const updateUsername = (e) => setUsername(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateConfirmPassword = (e) => setConfirmPassword(e.target.value);

  return (
    <form>
      <label className="form-group">
        Enter your email
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={updateEmail}
        />
      </label>
      <label className="form-group">
        Choose a username
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={updateUsername}
        />
      </label>
      <label className="form-group">
        Choose a password
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={updatePassword}
        />
      </label>
      <label className="form-group">
        Confirm your password
        <input
          type="password"
          name="password"
          id="password"
          value={confirmPassword}
          onChange={updateConfirmPassword}
        />
      </label>
    </form>
  );
};

export default SignupForm;
