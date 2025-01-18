// store/roles.js
import Vue from 'vue'
import api from '@/service/api';


export const fetchCustomer = async (config = {}) => {
  try {
    const response = await api.get('/api/customer', config);
    const data = response.data.data.items;
    // console.log('Customer Data From Store:', data);
    return data.map((data) => ({
      text: data.nama,
      value: data.id,
    }));
  } catch (error) {
    console.error('Gagal mengambil data customer:', error);
    throw error; // Melempar error agar bisa ditangani di tempat lain
  }
};

Vue.prototype.$fetchCustomer = fetchCustomer;
