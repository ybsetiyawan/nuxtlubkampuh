// store/roles.js
import Vue from 'vue'
import api from '@/service/api';

export const fetchRole = async () => {
  try {
    const response = await api.get('/api/roles');
    const roles = response.data.data;
    // console.log('Role Data From Store:', roles);
    return roles.map((role) => ({
      text: role.nama,
      value: role.id,
    }));
  } catch (error) {
    console.error('Gagal mengambil data role:', error);
    throw error; // Melempar error agar bisa ditangani di tempat lain
  }
};

Vue.prototype.$fetchRole = fetchRole;
