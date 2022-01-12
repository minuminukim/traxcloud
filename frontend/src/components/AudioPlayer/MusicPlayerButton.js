const MusicPlayerButton = ({ type, handleClick }) => {
  return <button onClick={handleClick}>{type}</button>;
};

export default MusicPlayerButton;
