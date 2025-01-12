const axios = require('axios');

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true, // Jika menggunakan cookies untuk autentikasi
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // Tambahkan headers Authorization jika ada token
    const token = process.client ? window.$nuxt.$cookies.get(process.env.TOKEN_KEY) : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Jika token expired (401), trigger logout otomatis
    if (error.response?.status === 401) {
      const errorCode = error.response.data.code;
      if (errorCode === "INVALID_CREDENTIALS") {
        console.error("Username or password is incorrect");
      } else if (errorCode === "TOKEN_EXPIRED") {
        alert('Token expired, logging out...')
        await window.$nuxt.$store.dispatch('logout'); // Trigger logout di Vuex
      }
      // console.warn('Token expired, logging out...');
    }
    return Promise.reject(error);
  }
);

module.exports = api;
