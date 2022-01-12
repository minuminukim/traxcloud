import "./PlayButton.css";

const PauseButton = ({ isPlaying, onClick }) => {
  return (
    <button
      className="media-button pause-button small-button"
      onClick={onClick}
    />
  );
};

export default PauseButton;
