import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import './assets/css/tailwind.output.css'
import App from './App'
import { SidebarProvider } from './context/SidebarContext'
import ThemedSuspense from './components/ThemedSuspense'
import { Windmill } from '@windmill/react-ui'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from './Store/configStore'
import axios from 'axios';
import './axiosHelper.js'



// if (process.env.NODE_ENV !== 'production') {
//   const axe = require('react-axe')
//   axe(React, ReactDOM, 1000)
// }

// axios.defaults.baseURL = 'http://e-commerce-api.test/api/v1'
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.interceptors.request.use(
//   (config) => {
//     let token = JSON.parse(localStorage.getItem('user'))?.token

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config;
//   },
//   (error) => {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );
// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.data.status === 401) {
//       localStorage.removeItem('user')
//     }
//     return Promise.reject(error);
//   }
// );

ReactDOM.render(
  <SidebarProvider>
    <Suspense fallback={<ThemedSuspense />}>
      <Windmill usePreferences>
        <Provider store={store} >
          <App />
        </Provider>
      </Windmill>
    </Suspense>
  </SidebarProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
