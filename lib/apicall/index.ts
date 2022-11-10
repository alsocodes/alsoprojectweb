import axios from 'axios';
// import { LOCAL_USER_KEY } from '../constants/keys';
// import store from '../redux/store';
// import { showAlert } from '../redux/actions/index';
// import 'axios-progress-bar/dist/nprogress.css';
// import { showProgressBar } from '../redux/actions/alert';

const instance = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:9000/api',
  timeout: 30000,
});

instance.interceptors.request.use(
  (config) => {
    // store.dispatch(showProgressBar(true));
    // const authState = store.getState().auth;
    // const token = authState.data?.access_token;
    // const { selectedGudang } = store.getState().menu;

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    //   config.headers.gudang_id = selectedGudang?.public_id || null;
    // }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    // store.dispatch(showProgressBar(false));
    return response.data;
  },
  (error) => {
    // store.dispatch(showProgressBar(false));
    // if (error.response?.status === 401 || error.response?.status === 403) {
    //   localStorage.removeItem(LOCAL_USER_KEY);
    //   window.location = '/signin';
    //   // }
    //   //  else if (error.response?.status === 404) {
    //   //   console.log("erroor -message : ", error.message);
    //   //   window.location = "/404";
    // } else {
    // handle all error except 401,404
    // console.log('you are error', error.response)
    //   store.dispatch(
    //     showAlert({
    //       message:
    //         error.response.data.message || error.message || error.response.data,
    //       type: 'danger',
    //       show: true,
    //     })
    //   );
    //   return Promise.reject(
    //     error.response?.data || { message: 'Network error!' }
    //   );
    // }
  }
);

export default instance;
