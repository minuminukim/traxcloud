const belongsTo = (sessionUserId, objectUserId) => {
  return sessionUserId === objectUserId;
};

export default belongsTo;
