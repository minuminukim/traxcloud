// ms => 'x:xx'
const formatTime = (time) => {
  const minutes = Math.floor(time / 60).toString();
  const seconds = Math.floor(time - minutes * 60)
    .toString()
    .padStart(2, '0');

  return `${minutes}:${seconds}`;
};

export default formatTime;
