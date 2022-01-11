const AudioElement = ({ track }) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();

  const audioElement = document.createElement('audio');
  audio.setAttribute('src', `${track.url}`);

  // pass audio element into the audio context
  return audioContext.createMediaElementSource(audioElement);
};

export default AudioElement;
