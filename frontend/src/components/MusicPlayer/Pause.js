import './MediaButton.css';

const Pause = ({ isPlaying, onClick }) => {
  return (
    <button
      className="media-button pause-button small-button"
      onClick={onClick}
    />
  );
};

export default Pause;
