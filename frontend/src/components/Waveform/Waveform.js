import WaveSurfer from 'wavesurfer.js';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import usePlay from '../../hooks/usePlay';
import { editTrack } from '../../actions/trackActions';
import { setSeeking } from '../../actions/playerActions';

const Waveform = ({ trackId, onReady, resetQueue, size = 'medium' }) => {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.tracks[trackId]);
  const { currentTime } = useSelector((state) => state.player);
  const containerRef = useRef(null);
  const wavesurfer = useRef();
  const { seekPosition, isPlaying } = useSelector((state) => state.player);

  const { selectTrack, isSelected } = usePlay(trackId);

  // Initialize waveform object
  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: containerRef.current,
      backend: 'MediaElement',
      waveColor: size === 'medium' ? '#8c8c8c' : '#dad8d8',
      progressColor: '#f50',
      responsive: true,
      interact: false,
      normalize: true,
      barGap: 1.1,
      barWidth: 2,
      cursorColor: 'transparent',
      barHeight: 1,
      height: size === 'medium' ? 70 : 100,
    });

    const audio = new Audio(track.trackUrl);
    audio.crossOrigin = 'anonymous';

    wavesurfer.current.load(audio, track.peakData);
    wavesurfer.current.setMute(true);

    // if waveform data doesn't exist, we send data to database
    if (!track.peakData || track.peakData.length === 0) {
      wavesurfer.current.load(audio);
      wavesurfer.current.on('waveform-ready', async () => {
        const peakData = await wavesurfer.current.exportPCM(256, 100, true);
        const updated = { ...track, peakData };
        await dispatch(editTrack(updated));
        onReady();
      });
    }

    wavesurfer.current.on('ready', () => {
      onReady();
    });

    return () => wavesurfer.current.destroy();
  }, [track.trackUrl, track.peakData, dispatch]);

  useEffect(() => {
    if (isSelected) {
      wavesurfer.current.seekTo(seekPosition);
    }
  }, [isSelected, seekPosition]);

  useEffect(() => {
    isSelected
      ? isPlaying
        ? wavesurfer.current.play(currentTime)
        : wavesurfer.current.pause()
      : wavesurfer.current.stop();
  }, [isPlaying, isSelected]);

  const onSeek = (e) => {
    /**
     * Synthetic mouse event doesn't have offsetX property,
     * so we calculate the difference between e.clientX
     * and containerRef's offsetLeft
     */
    const offsetX =
      e.clientX - containerRef.current.getBoundingClientRect().left;
    const offsetWidth = containerRef.current.offsetWidth;

    // Calculate mouse event position and time to seek to
    const position = offsetX / offsetWidth;
    const time = track?.duration * position;

    dispatch(setSeeking(position, time));
  };

  const onMouseDown = (e) => {
    if (!isSelected) {
      selectTrack();
      resetQueue();
    }

    onSeek(e);
  };

  return (
    <div
      className="waveform-container"
      ref={containerRef}
      onMouseDown={onMouseDown}
    ></div>
  );
};

export default Waveform;
