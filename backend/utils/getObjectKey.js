const getObjectKey = (objectUrl) => {
  const key = objectUrl.trim().split('/').pop();
  return key;
};

module.exports = getObjectKey;
