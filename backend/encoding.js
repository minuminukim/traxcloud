const { Mp3Encoder } = require('lamejs');

// 1 channel, 44.1khz samplerate, 128kbps encoding;
const mp3Encoder = new Mp3Encoder(2, 44100, 128);
