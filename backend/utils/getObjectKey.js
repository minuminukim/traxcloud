const { Track } = require('../db/models');

const getTrackKey = (track) => {
  // const { trackUrl } = track;
  let testUrl =
    'https://traxcloud-react-project.s3.amazonaws.com/1641887638412.mp3';
  const key = testUrl.trim().split('/').pop().split('.mp3')[0];
  console.log(key);
};

console.log(getTrackKey());
