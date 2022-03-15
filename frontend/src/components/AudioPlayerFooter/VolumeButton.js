import { IoMdVolumeHigh } from 'react-icons/io';

const VolumeButton = ({ onClick }) => {
  return (
    <IoMdVolumeHigh
      className="player-control volume-button"
      onClick={onClick}
    />
  );
};

export default VolumeButton;
