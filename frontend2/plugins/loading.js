export default ({ app, store }) => {
    app.router.beforeEach((to, from, next) => {
      console.log('Setting loading to true');
      store.commit('setLoading', true);
      next();
    });
  
    app.router.afterEach(() => {
      console.log('Setting loading to false');
      store.commit('setLoading', false);
    });
  };
  