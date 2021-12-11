window.axios = require('axios');
window.axios.defaults.baseURL = 'http://techblog.test/api'
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.axios.interceptors.request.use(
    (config) => {
        let token = JSON.parse(localStorage.getItem('user'))?.token

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

window.axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.data.status === 401) {
            localStorage.removeItem('user')
        }
        return Promise.reject(error);
    }
);