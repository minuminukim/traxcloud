import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateVolume } from '../../actions/playerActions';
import { VolumeButton } from '.';
import Slider from '../Slider';
import './Volume.css';

const Volume = () => {
  const dispatch = useDispatch();
  const { volume, isMuted, reference } = useSelector((state) => state.player);
  const [showSlider, setShowSlider] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(1);
  const toggleSlider = () => setShowSlider(!showSlider);

  const onScrub = (e) => {
    // Grab value from input and update volume in store
    const input = e.target;
    const newVolume = input.value;
    dispatch(updateVolume(input.value, false));

    // Update reference ref's volume
    reference.current.volume = newVolume;
  };

  const toggleMute = () => {
    const nextVolume = isMuted ? previousVolume : 0;

    // save current volume in state,
    // so we can revert back to it on next toggle
    if (!isMuted) {
      setPreviousVolume(volume);
    }

    dispatch(updateVolume(nextVolume, !isMuted));
    reference.current.volume = nextVolume;
  };

  return (
    <div
      className="volume-container"
      onMouseEnter={toggleSlider}
      onMouseLeave={toggleSlider}
    >
      <VolumeButton onClick={toggleMute}>
        {showSlider && (
          <Slider
            className="volume"
            min="0"
            max="1"
            step="0.02"
            value={volume}
            onChange={onScrub}
          />
        )}
      </VolumeButton>
    </div>
  );
};

export default Volume;
