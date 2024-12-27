import roleConfig from '~/routes/role-config';  // Import konfigurasi role

export default async function ({ store, redirect, route, $cookies }) {
  try {
    const token = $cookies.get('token');
    const role = $cookies.get('kode');

    // Jika pengguna belum login atau token tidak ada
    if (!store.getters.isAuthenticated && !token) {
      console.log('User not authenticated, redirecting to login...');
      return redirect('/login');
    }

    // Cek apakah rute ada dalam konfigurasi dan sesuai dengan role yang dibutuhkan
    const requiredRoles = roleConfig[route.path];

    

    if (requiredRoles) {
      // Jika ada aturan untuk rute ini dan role pengguna tidak termasuk dalam requiredRoles
      if (!requiredRoles.includes(role)) {
        console.log(`Unauthorized access to ${route.path} for role ${role}`);
        return redirect('/unauthorized');
      }
    }
    
  } catch (error) {
    console.error('Auth Middleware Error:', error);
  }
}
