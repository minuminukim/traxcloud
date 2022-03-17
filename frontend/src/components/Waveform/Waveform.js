import { useEffect, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WaveSurfer from 'wavesurfer.js';

const Waveform = ({ audio }) => {
  const container = useRef();
  // const memoizedAudio = useMemo(() => audio, [audio]);

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: container.current,
      progressColor: '#f50',
    });

    waveSurfer.load(audio);

    return () => waveSurfer.destroy();
  }, [audio]);

  return <div className="waveform-container" ref={container}></div>;
};

export default Waveform;
