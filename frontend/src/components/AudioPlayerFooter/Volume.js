import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateVolume } from '../../actions/playerActions';
import { Slider, VolumeButton } from '.';
import './Volume.css';

const Volume = () => {
  const dispatch = useDispatch();
  const { volume, isMuted, audio } = useSelector((state) => state.player);
  const [showSlider, setShowSlider] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(1);
  const toggleSlider = () => setShowSlider(!showSlider);

  const onSlide = (e) => {
    // Grab value from input and update volume in store
    const input = e.target;
    const newVolume = input.value;
    dispatch(updateVolume(input.value, false));

    // Update audio ref's volume
    audio.current.volume = newVolume;
  };

  const toggleMute = () => {
    const nextVolume = isMuted ? previousVolume : 0;

    // save current volume in state,
    // so we can revert back to it on next toggle
    if (!isMuted) {
      setPreviousVolume(volume);
    }

    dispatch(updateVolume(nextVolume, !isMuted));
    audio.current.volume = nextVolume;
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
            className="volume-slider"
            min="0"
            max="1"
            step="0.02"
            color="orange"
            value={volume}
            onChange={onSlide}
          />
        )}
      </VolumeButton>
    </div>
  );
};

export default Volume;
