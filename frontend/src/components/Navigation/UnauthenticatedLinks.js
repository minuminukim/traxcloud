import ModalWrapper from '../ModalWrapper';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';

const UnauthenticatedLinks = () => {
  return (
    <ul className="nav-links nav-links-right unauthenticated">
      <li className="nav-item">
        <ModalWrapper
          children={<LoginForm />}
          label="Sign In"
          className="nav-button transparent"
        />
      </li>
      <li className="nav-item">
        <ModalWrapper
          children={<SignupForm />}
          label="Create account"
          className="nav-button"
        />
      </li>
    </ul>
  );
};

export default UnauthenticatedLinks;
