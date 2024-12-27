// export default function ({ store, redirect, route }) {
//   const user = store.state.auth.user; // Ambil data user dari Vuex store
//   const requiredRoles = route.meta[0]?.requiresRole; // Ambil meta requiresRole

//   if (requiredRoles && (!user || !requiredRoles.includes(user.role))) {
//     // Jika pengguna tidak memiliki role yang sesuai
//     return redirect('/unauthorized'); // Redirect ke halaman "tidak diizinkan"
//   }
// }