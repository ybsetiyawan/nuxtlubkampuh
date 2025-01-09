<template>
  <v-app dark>
    <v-progress-linear
      v-if="isLoading"
      class="loading-bar" 
      indeterminate
      absolute
      top
      height="3"
    ></v-progress-linear>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >

    <v-toolbar elevation="0" class="">
      <v-toolbar-title class="ml-0">
        <div style="display: flex">
          <img :src="computeLogo" height="50"/>
        </div>
      </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    

    <!-- avatar dan user -->
    <v-list-item
      style="padding-bottom: 0px"
      two-line
      :class="miniVariant && 'px-2'"
      link
    >
      <v-list-item-avatar color="#ecf0f1" size="42">
        <img
          style="width: 100%; height: 100%; object-fit: cover"
          :src="avatar"
          @error="$event.target.src = '/_nuxt/assets/avatar/boy.png'"
        />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title style="font-size: 11pt">{{
          userData.nama
        }}</v-list-item-title>
        <v-list-item-subtitle style="font-size: 10pt">{{
          userData.role.name
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <v-list class="pa-0">
        <template v-for="(item, index) in items ">
          <template v-if="item.children && item.children.length > 0">
            <v-list-group :to="item.link">
              <template v-slot:prependIcon>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on" v-text="item.classIcon" />
                  </template>
                  <!-- title di icon menu yang punya children -->
                  <span :title="item.nama">{{ item.nama }}</span>
                </v-tooltip>
              </template>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="item.nama" :title="item.nama" />
                </v-list-item-content>
              </template>
              <!-- children -->
              <v-list-item
                v-for="subItem in item.children"
                :key="subItem.nama"
                :to="subItem.link"
              >
                <v-list-item-icon>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on" v-text="subItem.classIcon" />
                    </template>
                    <span :title="subItem.nama">{{ subItem.nama }}</span>
                  </v-tooltip>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title :title="subItem.nama" v-text="subItem.nama" />
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </template>
          
          <!-- menu yang tidak punya children -->
          <template v-else>
            <v-list-item :to="item.link">
              <v-list-item-icon>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on" v-text="item.classIcon" />
                  </template>
                  <span :title="item.nama">{{ item.nama }}</span>
                </v-tooltip>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title :title="item.nama" v-text="item.nama" />
              </v-list-item-content>
            </v-list-item>
          </template>
        </template>
      </v-list>
     
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title> 
        <span style="color: #01579b;"> Selamat Datang kembali, {{ userData.nama }}</span></v-toolbar-title>
      <v-spacer />
      <!-- <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-account</v-icon>
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn> -->

      <!-- menu bar kanan -->
      <v-menu
        offset-y
        origin="center center"
        class="elevation-1"
        transition="scale-transition"
      >
        <template v-slot:activator="{ attrs, on }">
          <div style="margin: auto;">
            <v-btn dense depressed text v-bind="attrs" v-on="on">
              <div class="mr-1">
                <v-avatar size="30px">
                  <img :src="avatar"  /> &nbsp;
                </v-avatar>
              </div>
              <v-spacer></v-spacer>
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </div>
        </template>
        <v-list class="pa-0">
          <v-list-item
            v-for="(item, index) in profileMenus"
            :to="!item.href ? { name: item.name } : null"
            @click="item.click"
            ripple="ripple"
            :disabled="item.disabled"
            :target="item.target"
            rel="noopener"
            :key="index"
          >
            <v-list-item-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-1">
        <Nuxt />
      </v-container>
    </v-main>
    
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }} LAB UJI BAHAN KAMPUH INDONESIA {{  }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, } from 'vuex';

export default {
  middleware: 'auth',
  data() {
    return {
      drawer: false,
      miniVariant: false,
      clipped: false,
      fixed: false,
      rightDrawer: false,
      right: false,
      userData: this.$cookies.get('user'), 
      profileMenus: [
        {
          icon: "mdi-account",
          href: "#",
          title: "Profile",
          click: this.handleProfile,
        },
        // {
        //   icon: "mdi-cog",
        //   href: "#",
        //   title: "Settings",
        //   click: this.handleSetting,
        // },
        {
          icon: "mdi-power",
          href: "#",
          title: "Logout",
          click: this.handleLogout,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['items','isAuthenticated', 'loading']),


    avatar() {
      return require(`~/assets/avatar/boy.png`);
    },
    computeLogo() {
      return require(`~/static/logo.png`);
    },
    isLoading() {
    return this.$store.state.loading;
  },
    
  },
  mounted() {
    if (this.isAuthenticated) {
      this.fetchMenuItems(); // Panggil fetchMenuItems hanya jika sudah login
    }

    this.$root.$on('start-loading', () => {
    this.$store.commit('setLoading', true);
    });
    this.$root.$on('stop-loading', () => {
    this.$store.commit('setLoading', false); 
    });

    // console.log('Mounted: Loading state:', this.$store.state.loading);

   
  },
  methods: {
    async fetchMenuItems() {
      try {
        await this.$store.dispatch('fetchMenuItems');
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    },

    async handleLogout() {
      try{
        const result = await this.$showConfirmationDialog();
        if(result.isConfirmed) {
          this.$root.$emit("start-loading"); // Mulai loading
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Tambahkan penundaan 1 detik
          this.$store.dispatch('logout');
        }
      } catch (error) {
        this.$toast.fire({
            icon: 'error',
            title: error.response?.data?.message || 'Gagal Logout',
            });
      } finally {
              this.$root.$emit("stop-loading"); // Selesai loading
        }
    },

    handleProfile() {
      this.$router.push("/pengaturan/user/profile");
    },
  },
};
</script>

<style scoped> 
.v-progress-linear {
  z-index: 9999 !important;
  position: fixed;
  top: 0;
} 

.loading-bar {
  background-image: linear-gradient(to right, rgb(245, 7, 245), rgb(64, 245, 119));
}
</style>


