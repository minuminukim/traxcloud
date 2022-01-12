import './MediaButton.css';

const PlayButton = ({ isPlaying, onClick }) => {
  return (
    <button
      className="media-button play-button small-button"
      onClick={onClick}
    />
  );
};

export default PlayButton;
