export default function ({ store, redirect, $cookies }) {
    console.log('Checking authentication...');
    const token = $cookies.get('token');
    if (!store.getters.isAuthenticated && !token) {
      console.log('User not authenticated, redirecting to login...');
      return redirect('/login');
    }
  }