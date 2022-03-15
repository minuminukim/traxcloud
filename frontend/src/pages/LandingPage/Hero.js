import Button from '../../components/common/Button';
import ModalWrapper from '../../components/ModalWrapper';
import SignupForm from '../../components/SignupForm';
import LoginForm from '../../components/LoginForm';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h2 className="hero-title">
          What's next in music is first on TraxCloud
        </h2>
        <h3 className="hero-tagline">
          Upload your first track and begin your journey. TraxCloud gives you
          space to create, find your fans, and connect with other artists.
        </h3>
        <div className="hero-buttons">
          <ModalWrapper
            children={<LoginForm />}
            label="Try Demo"
            className="large-button transparent"
          />
          <ModalWrapper
            children={<SignupForm />}
            label="Start uploading today"
            className="large-button"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
