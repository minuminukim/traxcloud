import { useEffect, useRef, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDuration, setTrack } from '../../actions/playerActions';
import WaveSurfer from 'wavesurfer.js';

const Waveform = ({ trackId }) => {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.tracks[trackId]);
  const waveformRef = useRef();
  const wavesurfer = useRef(null);
  const { isPlaying, currentTrackId, seekingTime } = useSelector(
    (state) => state.player
  );
  const [isCurrent, setIsCurrent] = useState(false);

  // const { audio } = useSelector((state) => state.player);
  // const memoizedAudio = useMemo(() => audio, [audio]);

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      progressColor: '#f50',
      // backend: 'MediaElement',
      responsive: true,
    });

    wavesurfer.current.load(track.trackUrl);
    wavesurfer.current.on('ready', () => {
      // wavesurfer.current.toggleInteraction();
      // dispatch(setDuration(wavesurfer.current.getDuration()));
      // console.log('image', wavesurfer.current.exportImage());
      // wavesurfer.current.play();
      onReady()
    });

    wavesurfer.current.on('interaction', () => {
      console.log('current', wavesurfer.current.getCurrentTime());
    });
    return () => wavesurfer.current.destroy();
  }, [track.trackUrl]);

  const onReady = () => {
    if (!isPlaying) return;
    if (currentTrackId === trackId) {
      setIsCurrent(true);
    }
  };

  const onClick = () => {
    if (!isCurrent) {
      console.log('current', wavesurfer.current.getCurrentTime())
      dispatch(setTrack(trackId));
    }
  };

  return (
    <div
      className="waveform-container"
      ref={waveformRef}
      onClick={onClick}
    ></div>
  );
};

export default Waveform;
