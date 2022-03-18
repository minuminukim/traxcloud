import { useEffect, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WaveSurfer from 'wavesurfer.js';

const Waveform = ({ trackId }) => {
  const waveformRef = useRef();
  const wavesurfer = useRef(null);

  const { trackUrl } = useSelector((state) => state.tracks[trackId]);
  // const { audio } = useSelector((state) => state.player);
  // const memoizedAudio = useMemo(() => audio, [audio]);

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      progressColor: '#f50',
      backend: 'MediaElement',
      responsive: true,
    });

    wavesurfer.current.load(trackUrl);
    wavesurfer.current.on('ready', () => {
      // wavesurfer.current.play();
    });

    return () => wavesurfer.current.destroy();
  }, [trackUrl]);

  return <div className="waveform-container" ref={waveformRef}></div>;
};

export default Waveform;
