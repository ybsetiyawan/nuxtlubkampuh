import api from '@/service/api';


export const fetchMenuItems = async (idRole, token) => {
//   console.log('Fetching menu items for roleId:', idRole);
//   console.log('Using token:', token);
  try {
    const response = await api.get(`/api/menu-user?roleId=${idRole}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Menu items fetched:', response.data.data);
    return response.data.data; // Kembalikan data menu
  } catch (error) {
    console.error('Error fetching menu items:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    throw error; // Lempar error agar bisa ditangani di tempat lain
  }
};