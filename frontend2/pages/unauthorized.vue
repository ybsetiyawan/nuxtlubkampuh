<template>
  <div class="unauthorized">
    <div class="container">
      <div class="kode-erreur">
        <span>403</span>
      </div>
      <h2>Akses Tidak Diizinkan</h2>
      <p>Anda tidak memiliki izin untuk mengakses halaman ini.</p>
      <v-btn color="primary" nuxt to="/">Home</v-btn>
    </div>
  </div>
</template>


<style>
.unauthorized {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  background-color: #121212;
}

.container {
  text-align: center;
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
}

p {
  font-size: 18px;
}




</style>