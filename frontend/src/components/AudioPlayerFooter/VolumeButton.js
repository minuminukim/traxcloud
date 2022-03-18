import { useSelector } from 'react-redux';
import { FaVolumeDown, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const VolumeButton = ({ onClick, children }) => {
  const { volume } = useSelector((state) => state.player);

  const iconReducer = () => {
    switch (true) {
      case volume >= 0.5:
        return <FaVolumeUp onClick={onClick} />;
      case volume > 0 && volume < 0.5:
        return <FaVolumeDown onClick={onClick} />;
      case volume === 0:
        return <FaVolumeMute onClick={onClick} />;
      default:
        return <FaVolumeMute onClick={onClick} />;
    }
  };

  const Icon = iconReducer();

  return (
    <div className="player-control volume-button">
      {Icon}
      {children}
    </div>
  );
};

export default VolumeButton;
