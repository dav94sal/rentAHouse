import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
  options.headers = options.headers || {};
  options.method = options.method || 'GET';

  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] =
      options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }

  const response = await window.fetch(url, options);

  if (response.ok) return response
  else throw response

}

export function restoreCSRF() {
  csrfFetch('/api/csrf/restore')
}
