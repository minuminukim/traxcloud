import { useEffect, useRef } from 'react';
import { setWaveform } from '../../actions/playerActions';
import WaveSurfer from 'wavesurfer.js/src/wavesurfer';

const GlobalAudio = () => {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const { currentTrackId, currentTime } = useSelector((state) => state.player);

  // Initialize wavesurfer object
  useEffect(() => {
    audioRef.current = WaveSurfer
  }, [currentTrackId]);


  return <div id="global-audio-container" ref={audioRef} hidden></div>;
};
