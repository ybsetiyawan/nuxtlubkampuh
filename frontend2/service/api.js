const axios = require('axios');

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true

});
// Add request interceptor
api.interceptors.request.use(
  config => {
    // Tambahkan headers yang diperlukan
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

module.exports = api;
