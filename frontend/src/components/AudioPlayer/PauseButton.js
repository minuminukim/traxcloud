import './PlayButton.css';

const PauseButton = ({ size, onClick }) => {
  return (
    <button
      className={`media-button pause-button ${size}-button`}
      onClick={onClick}
    />
  );
};

export default PauseButton;
