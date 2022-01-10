const sanitizeString = (string) => {
  const sanitized = string.trim().toLowerCase().split(/\s+/).join('-');
  return sanitized;
};

export default sanitizeString;
