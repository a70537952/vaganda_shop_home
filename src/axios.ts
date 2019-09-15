import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL = 'https://api.vagandashop.local/';

let apiToken = Cookies.get(process.env.REACT_APP_COOKIE_API_TOKEN_KEY);

if (apiToken) {
  axios.defaults.headers.Authorization = 'Bearer ' + apiToken;
}
let locale = localStorage.getItem('i18nextLng');
if (locale) {
  axios.defaults.headers.Locale = locale;
}

export default axios;
