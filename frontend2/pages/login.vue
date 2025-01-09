<template>
  <v-container
    class="d-flex justify-center align-center fill-height"
    style="
      background-image: url('/lab0.jpg');
      background-size: cover;
      background-position: center;
    "
  >
    <v-progress-linear
      v-if="isLoading"
      class="loading-bar"
      indeterminate
      absolute
      top
      height="3"
    ></v-progress-linear>

    <div>
      <v-card max-width="400" class="pa-5 card-login">
        <img src="/logo.png" alt="Logo" class="logo-login" />
        <v-divider class="logo-divider my-4" color="error" length="50" />
        <h2 class="login-title">Welcome To LUJB Kampuh Application</h2>

        <v-card-text>
          <v-form v-model="valid" @submit.prevent="submitLogin">
            <v-text-field
              class="usernamefield"
              placeholder="Username"
              label="Username"
              v-model="username"
              outlined
              dense
            ></v-text-field>

            <v-text-field
              placeholder="Password"
              label="Password"
              v-model="password"
              @click:append="showPassword = !showPassword"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              outlined
              dense
            ></v-text-field>

            <v-btn
              type="submit"
              :disabled="!username || !password"
              color="primary"
              block
              >Login</v-btn
            >
          </v-form>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn text small @click="goToRegister"
            >Don't have an account? Register</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  layout: "login",
  data() {
    return {
      showPassword: false,
      username: "",
      password: "",
      valid: false,
      cardWidth: "700px",
      cardHeight: "auto",
      rules: {
        required: (v) => !!v || "Field is required",
        email: (v) => /.+@.+\..+/.test(v) || "Must be a valid email",
      },
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.loading;
    },
  },
  methods: {
    async submitLogin() {
      try {
        this.$root.$emit("start-loading"); // Mulai loading
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Tambahkan penundaan 1 detik
        await this.$store.dispatch("login", {
          username: this.username,
          password: this.password,
        });
        this.$router.replace("/"); // Navigasi ke halaman utama setelah login
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Login failed: Unknown error";
        alert(errorMessage);
        console.log(error);
      } finally {
        this.$root.$emit("stop-loading"); // Selesai loading
      }
    },
    goToRegister() {
      this.$router.push("/register");
    },
  },

  mounted() {
    this.$root.$on("start-loading", () => {
      this.$store.commit("setLoading", true);
    });
    this.$root.$on("stop-loading", () => {
      this.$store.commit("setLoading", false);
    });

    // console.log('Mounted: Loading state:', this.$store.state.loading);
  },
};
</script>

<style>
.fill-height {
  max-width: 100vw;
  max-height: 100vh;
}

.card-login {
  margin: auto;
  width: 90%;
  max-width: 400px;
  height: auto;
  background-color: rgba(210, 208, 206, 0.8) !important;
  backdrop-filter: blur(4px) !important;
  border-radius: 10px !important;
}

.logo-login {
  width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

h2.login-title {
  text-align: center;
  margin: 20px 0;
}

.loading-bar {
  background-image: linear-gradient(
    to right,
    rgb(5, 248, 25),
    rgb(226, 7, 255)
  );
}


/* .v-progress-linear.loading-bar .v-progress-linear__bar {
  background-image: inherit;
} */
</style>
