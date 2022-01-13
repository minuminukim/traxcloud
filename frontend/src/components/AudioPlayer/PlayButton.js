import './PlayButton.css';

const PlayButton = ({ size, onClick }) => {
  return (
    <button
      className={`media-button play-button ${size}-button`}
      onClick={onClick}
    ></button>
  );
};

export default PlayButton;
