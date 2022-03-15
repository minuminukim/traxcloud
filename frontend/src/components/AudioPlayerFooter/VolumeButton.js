import { useSelector } from 'react-redux';
import { FaVolumeDown, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const VolumeButton = ({ onClick }) => {
  const { volume } = useSelector((state) => state.player);
  const iconReducer = () => {
    switch (true) {
      case volume >= 0.5:
        return <FaVolumeUp />;
      case volume > 0 && volume < 0.5:
        return <FaVolumeDown />;
      case volume === 0:
        return <FaVolumeMute />;
      default:
        return <FaVolumeMute />;
    }
  };

  const Icon = iconReducer();

  return (
    <div className="player-control volume-button" onClick={onClick}>
      {Icon}
    </div>
  );
};

export default VolumeButton;
