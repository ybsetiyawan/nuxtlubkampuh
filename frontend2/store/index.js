import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/service/api';
import { fetchMenuItems } from './menu';

Vue.use(Vuex);

export const state = () => ({
  token: null,
  user: null,
  idRole: null,
  // nama: null,
  items: [],
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  setUser(state, user) {
    state.user = user;
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
  setNama(state, nama) {
    state.nama = nama;
  },
};

export const getters = {
  isAuthenticated(state) {
    return !!state.token;
  },
  getUser(state) {
    return state.user;
  },
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
    // commit('setNama', cookies.nama || null);
  },

  //Pengguna melakukan login melalui action login di store/index.js. Setelah login berhasil,
  //token dan idRole disimpan di state Vuex.
  async login({ commit, dispatch }, { username, password }) {
    const response = await api.post('/api/users/login', { username, password });
    console.log('Login Response:', response);

    const { token, user } = response.data.data;
    
    commit('setToken', token.AccessToken);
    this.$cookies.set(this.$config.tokenKey, token.AccessToken);
    
    // commit('setUser', user);
    commit('setIdRole', user.idRole);
    this.$cookies.set('idRole', user.idRole);

    commit('setNama', user.nama);
    this.$cookies.set('nama', user.nama);

    console.log('ID Role:', user.idRole);
    console.log('Access Token:', token.AccessToken);

    //setelah login berhasil dan menyimpan token dan idRole, maka fetch menu items.
    await dispatch('fetchMenuItems', token.AccessToken);

    console.log('Token:', token.AccessToken);
    console.log('User:', user);
  },

  async logout({ commit }) {
    commit('clearAuth');
    this.$cookies.remove(this.$config.tokenKey)
    this.$cookies.remove('idRole');
    this.$cookies.remove('nama');
    this.$router.push('/login');
  },

  
  // async fetchMenuItems({ state, commit }) {
  //   console.log('Fetching menu items for roleId:', state.idRole);
  //   console.log('Using token:', state.token);
  //   try {
  //     const response = await api.get(`/api/menu-user?roleId=${state.idRole}`, {
  //       headers: {
  //         Authorization: `Bearer ${state.token}`
  //       }
  //     });
  //     console.log('Menu items fetched:', response.data.data);
  //     commit('setItems', response.data.data);
  //   } catch (error) {
  //     console.error('Error fetching menu items:', error);
  //     if (error.response) {
  //       console.error('Response data:', error.response.data);
  //       console.error('Response status:', error.response.status);
  //       console.error('Response headers:', error.response.headers);
  //     }
  //   }
  // },

  async fetchMenuItems({ state, commit }) {
    try {
      const items = await fetchMenuItems(state.idRole, state.token); // Panggil fungsi dari file baru
      commit('setItems', items); // Simpan items ke state
    } catch (error) {
      console.error('Failed to fetch menu items in store:', error);
    }
  },

  
};
