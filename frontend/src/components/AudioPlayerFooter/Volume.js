import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateVolume } from '../../actions/playerActions';
import { IoMdVolumeHigh } from 'react-icons/io';
import './Volume.css';

const Volume = () => {
  const dispatch = useDispatch();
  const [volume, setVolume] = useState(1);
  const [isMuted, setMuted] = useState(false);
  const [showSlider, setShowSlider] = useState(false);
  const toggleSlider = () => setShowSlider(!showSlider);
  const updateVolume = (e) => {
    console.log('@@@@@', e);
    setVolume(+e.target);
  };

  return (
    <div
      className="volume"
      onMouseEnter={toggleSlider}
      onMouseLeave={toggleSlider}
    >
      <IoMdVolumeHigh className="player-control" />
      {showSlider && (
        <input
          type="range"
          min={0}
          max={1}
          step={0.02}
          value={volume}
          onChange={updateVolume}
        />
      )}
    </div>
  );
};

export default Volume;
