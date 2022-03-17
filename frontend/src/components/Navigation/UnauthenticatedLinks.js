import ModalWrapper from '../ModalWrapper';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';

const UnauthenticatedLinks = () => {
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
