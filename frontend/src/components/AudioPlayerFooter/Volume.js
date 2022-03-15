import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateVolume } from '../../actions/playerActions';
import { Slider } from '.';
import { IoMdVolumeHigh } from 'react-icons/io';
import './Volume.css';

const Volume = () => {
  const dispatch = useDispatch();
  const { volume, isMuted, audio } = useSelector((state) => state.player);
  const [showSlider, setShowSlider] = useState(false);
  const toggleSlider = () => setShowSlider(!showSlider);
  const onChange = (e) => {
    const newVolume = e.target.value;
    dispatch(updateVolume(e.target.value, false));
    audio.current.volume = newVolume;
  };

  return (
    <div
      className="volume"
      onMouseEnter={toggleSlider}
      onMouseLeave={toggleSlider}
    >
      <IoMdVolumeHigh className="player-control" />
      {showSlider && (
        <Slider
          min="0"
          max="1"
          step="0.02"
          color="orange"
          value={volume}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default Volume;
