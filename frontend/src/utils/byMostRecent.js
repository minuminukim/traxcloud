export const byMostRecent = (arrayOfResources) => {
  return arrayOfResources.sort((a, b) => b.id - a.id);
};
