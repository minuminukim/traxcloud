const prefixCORS = (url) => {
  const proxy = `https://safe-cliffs-42521.herokuapp.com/`;
  return proxy + url;
};

export default prefixCORS;
