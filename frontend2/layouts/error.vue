<template>
  <div class="error-page">
    <div class="container">
      <div class="kode-erreur">
        <span v-if="error.statusCode === 404">404</span>
        <span v-else-if="error.statusCode === 500">500</span>
        <span v-else>{{ error.statusCode }}</span>
      </div>
      <h2 v-if="error.statusCode === 404">{{ pageNotFound }}</h2>
      <h2 v-else>{{ otherError }}</h2>
      <v-btn color="primary" nuxt to="/">Home</v-btn>
    </div>
  </div>
</template>



<script>
export default {
  name: 'ErrorPage',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: 'Error Page Not Found',
      otherError: 'An error occurred'
    }
  },
  head() {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return { title }
  }
}


</script>

<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  background-color: #121212;
}

.container {
  text-align: center;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  
}

.kode-erreur {
  font-size: 96px;
  font-weight: bold;
  color: #FF5252;
  
}

h2 {
  font-size: 24px;
  margin-bottom: 26px;
}
</style>

