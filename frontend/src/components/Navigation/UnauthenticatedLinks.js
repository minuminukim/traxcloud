import { useDemo } from '../../hooks';
import ModalWrapper from '../ModalWrapper';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import Button from '../common/Button';

const UnauthenticatedLinks = () => {
  const loginDemoUser = useDemo();

  return (
    <ul className="nav-links nav-links-right unauthenticated-links">
      <li className="nav-item-button">
        <ModalWrapper
          children={<LoginForm />}
          label="Sign In"
          className="nav-button transparent"
        />
      </li>
      <li className="nav-item-button">
        <Button
          label="Try Demo"
          className="nav-button transparent"
          onClick={loginDemoUser}
        />
      </li>
      <li className="nav-item-button">
        <ModalWrapper
          children={<SignupForm />}
          label="Create account"
          className="nav-button signup-button"
        />
      </li>
    </ul>
  );
};

export default UnauthenticatedLinks;
