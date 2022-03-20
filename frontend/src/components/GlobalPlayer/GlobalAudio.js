import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWaveform, updateTime } from '../../actions/playerActions';
import WaveSurfer from 'wavesurfer.js/src/wavesurfer';
import usePlay from '../../hooks/usePlay';

const GlobalAudio = () => {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const containerRef = useRef(null);
  const { currentTrackId, isPlaying, seekPosition } = useSelector(
    (state) => state.player
  );
  const track = useSelector((state) => state.tracks[currentTrackId]);
  const { isSelected } = usePlay(currentTrackId);

  // Initialize wavesurfer object
  useEffect(() => {
    audioRef.current = WaveSurfer.create({
      container: containerRef.current,
    });

    audioRef.current.load(track.trackUrl, track.peakData);
    audioRef.current.on('ready', () => dispatch(setWaveform(audioRef)));
    audioRef.current.on(
      'audioprocess',
      dispatch(updateTime(audioRef.current.getCurrentTime()))
    );

    return () => audioRef.current.destroy();
  }, [currentTrackId]);

  useEffect(() => {
    if (isPlaying && isSelected) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, isSelected]);

  useEffect(() => {
    audioRef.current.seekTo(seekPosition);
  }, [seekPosition]);

  return <div id="global-audio-container" ref={containerRef} hidden></div>;
};

// export default GlobalAudio;
