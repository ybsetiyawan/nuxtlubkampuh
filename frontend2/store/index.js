import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/service/api';
import { fetchMenuItems } from './menu';

Vue.use(Vuex);

export const state = () => ({
  token: null,
  // user: null,
  idRole: null,
  // nama: null,
  items: [],
  loading: false,
  sessionExpired: false
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  clearAuth(state) {
    state.token = null;
    state.user = null;
  },
  setIdRole(state, idRole) {
    state.idRole = idRole;
  },
  setItems(state, items) {
    state.items = items;
  },
  
  setLoading(state, value) {
    state.loading = value
  },
  setSessionExpired(state, value) {
    state.sessionExpired = value;
  },
};

export const getters = {
  isAuthenticated(state) {
    return !!state.token;
  },
  // getUser(state) {
  //   return state.user;
  // },
  items(state) {
    return state.items;
  },
  idRole(state) {
    return state.idRole;
  },
  
  // nama(state) {
  //   return state.nama;
  // },
};

//cek idRole dan token saat halaman di load kembali, jika ada maka langsung di load menu, jika tidak ada maka di redirect ke login

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    // Memuat token dan idRole dari cookies saat server-side rendering
    const cookies = this.$cookies.getAll(req);
    const token = cookies[this.$config.tokenKey] || null; // Ambil token dengan kunci yang benar
    commit('setToken', token);
    commit('setIdRole', cookies.idRole || null);
  },
  

  //Pengguna melakukan login melalui action login di store/index.js. Setelah login berhasil,
  //token dan idRole disimpan di state Vuex.
  async login({ commit, dispatch }, { username, password }) {


    const response = await api.post('/api/users/login', { username, password });
    console.log('Login Response:', response);

    const { token, user, } = response.data.data;
    
    commit('setToken', token.AccessToken);
    this.$cookies.set(this.$config.tokenKey, token.AccessToken);
    commit('setIdRole', user.idRole);
    this.$cookies.set('idRole', user.idRole);
    this.$cookies.set('kode', user.role.kode);
    this.$cookies.set('user', user);

  },

  async fetchMenuItems({ state, commit, dispatch }) {
    try {
      const items = await fetchMenuItems(state.idRole, state.token);
      commit('setItems', items);
    } catch (error) {
      // if (error.response && error.response.status === 401) {
      //   console.warn('Unauthorized, showing session expired dialog...');
      //   commit('setSessionExpired', true);
      // }
    }
  },

  async logout({ commit }) {
    commit('clearAuth');
    this.$cookies.remove(this.$config.tokenKey);
    this.$cookies.remove('idRole');
    this.$cookies.remove('kode');
    this.$cookies.remove('user');
    if (process.client) {
      this.$router.push('/login'); // Redirect ke halaman login
    }
  },


  
  
};
