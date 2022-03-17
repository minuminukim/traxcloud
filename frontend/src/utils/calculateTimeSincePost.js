const calculateTimeSincePost = (timeString) => {
  console.log('timeString', timeString);
  const intervals = [
    { interval: 'year', seconds: 31536000 },
    { interval: 'month', seconds: 2592000 },
    { interval: 'day', seconds: 86400 },
    { interval: 'hour', seconds: 3600 },
    { interval: 'minute', seconds: 60 },
    { interval: 'second', seconds: 1 },
  ];

  const then = +new Date(timeString);
  const seconds = Math.floor((+new Date() - then) / 1000);
  // if (!seconds || seconds < 600) return 'less than 10 minutes ago'
  const interval = intervals.find((i) => i.seconds < seconds);
  if (!interval) return 'Just now';
  const count = Math.floor(seconds / interval.seconds);

  return `${count} ${interval.interval}${count !== 1 ? 's' : ''} ago`;
};

export default calculateTimeSincePost;
