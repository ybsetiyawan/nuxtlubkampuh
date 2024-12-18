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
  iconColor: '#f39c12', // Warna ikon
  customClass: {
    popup: 'shadow-lg', // Tambahkan bayangan
  },
});

Vue.prototype.$swal = Swal
Vue.prototype.$toast = Toast
