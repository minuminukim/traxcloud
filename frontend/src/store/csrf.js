import Cookies from 'js-cookie';

export const csrfFetch = async (url, options = {}) => {
  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== 'GET') {
    if (options.headers['Content-Type'] === 'multipart/form-data') {
      delete options.headers['Content-Type'];
    } else {
      options.headers['Content-Type'] =
        options.headers['Content-Type'] || 'application/json';
    }
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }

  const response = await window.fetch(url, options);

  if (response.status >= 400) {
    throw response;
  }

  return response;
};

export const restoreCSRF = () => csrfFetch('/api/csrf/restore');
