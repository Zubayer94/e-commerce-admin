window.axios = require('axios');
window.axios.defaults.baseURL = 'http://e-commerce-api.test/api/v1'
window.axios.defaults.headers.common = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

window.axios.interceptors.request.use(
    (config) => {
        let token = 'sncjksckjsjkcsjkcksjchsjkchsjc'
        // let token = JSON.parse(localStorage.getItem('user'))?.token

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
        if (error.response.status === 401) {
            localStorage.removeItem('user')
        }
        return Promise.reject(error);
    }
);