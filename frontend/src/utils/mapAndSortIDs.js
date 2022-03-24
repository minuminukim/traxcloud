// Takes in an array of objects and maps them to an array
// of IDs, sorted in descending order

const mapAndSortIDs = (arr) => {
  return arr.map(({ id }) => id).sort((a, b) => b - a);
};

export default mapAndSortIDs;
