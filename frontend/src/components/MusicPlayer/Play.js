import './MediaButton.css';

const Play = ({ isPlaying, onClick }) => {
  return (
    <button
      className="media-button play-button small-button"
      onClick={onClick}
    />
  );
};

export default Play;
