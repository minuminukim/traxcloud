import { useRef } from 'react';
import prefixCORS from '../../utils/prefixCORS';

const AudioElement = ({ trackUrl }) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();

  // pass audio element into the audio context (whats actually playing)
  // let audioElement;
  // const track = audioContext.createMediaElementSource(audioElement);

  // track.connect(audioContext.destination);

  return (
    <audio
      src={prefixCORS(trackUrl)}
      preloaded="metadata"
      crossOrigin="true"
    ></audio>
  );
};

const Audio = ({ trackUrl }) => {
  <audio src={trackUrl} preloaded="metadata" crossOrigin="true"></audio>;
  console.log(Audio);
};

export default AudioElement;
