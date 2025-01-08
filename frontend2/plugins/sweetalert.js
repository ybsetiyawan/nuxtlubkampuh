import Vue from 'vue'
import Swal from 'sweetalert2'

// Mengatur tema dark sebagai default
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: '#333', // Warna latar belakang untuk dark mode
  color: '#fff', // Warna teks untuk dark mode
  iconColor: '#14ffc8', // Warna ikon
  customClass: {
    popup: 'shadow-lg', // Tambahkan bayangan
  },
});

export const showConfirmationDialog = async () => {
  return await Swal.fire({
    title: 'Apakah Anda yakin?',
    text: 'Data ini akan dihapus dan tidak bisa dikembalikan!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal',
    background: '#333',  // Dark background
    color: '#fff',  // White text
    iconColor: '#f39c12', // Yellow icon for warning
    width: '450px',  // Adjust width of the popup
  });
};



Vue.prototype.$swal = Swal
Vue.prototype.$toast = Toast
Vue.prototype.$showConfirmationDialog = showConfirmationDialog;
