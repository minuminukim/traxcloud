// Fisher-Yates shuffle
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle

const shuffle = ([...array]) => {
  let remaining = array.length;
  while (remaining) {
    const index = Math.floor(Math.random() * remaining--);
    [array[remaining], array[index]] = [array[index], array[remaining]];
  }

  return array;
};

export default shuffle;
