<template>
    <v-container fluid>
      <v-row>
        <v-col md="4">
          <v-card>
            <v-card-text>
              <center>
                <div
                  class="frame-foto"
                  style="
                    border: 1px solid #ddd;
                    height: 200px;
                    width: 200px;
                    border-radius: 50%;
                    margin-bottom: 15px;
                  "
                >
                  <!-- <img
                    v-if="!data_profile.foto"
                    style="
                      width: 100%;
                      border-radius: 50%;
                      height: 100%;
                      object-fit: cover;
                    "
                    src="~/assets/img/superadmin.png"
                    alt="_foto"
                  />
                  <img
                    v-else
                    style="
                      width: 100%;
                      border-radius: 50%;
                      height: 100%;
                      object-fit: cover;
                    "
                    :src="data_profile.foto_user"
                    alt="_foto"
                    @error="
                      $event.target.src = '/_nuxt/assets/img/superadmin.png'
                    "
                  /> -->
                  <img
                    style="
                      width: 100%;
                      border-radius: 50%;
                      height: 100%;
                      object-fit: cover;
                    "
                    src="~/assets/avatar/boy.png"
                    alt="_foto"
                    
                  />
                </div>
                <!-- <div style="margin: 5px">
                  <v-btn
                    @click="(dialogFoto = true), (fotoName = data_profile.foto);"
                    block
                    small
                    dark
                    color="primary"
                    >Ubah Foto <v-icon small>mdi mdi-pencil</v-icon></v-btn
                  >
                </div> -->
                <div></div>
                <v-spacer></v-spacer>
                <div style="margin: 5px">
                  <v-btn
                    @click="dialogPassword = true"
                    block
                    small
                    dark
                    color="primary"
                    >Ubah Password <v-icon small>mdi mdi-pencil</v-icon></v-btn
                  >
                </div>
              </center>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col md="8">
          <v-card>
            <v-toolbar color="white" flat dense>
              <v-toolbar-title class="subheading">
                <v-icon style="color: #333; margin-top: -5px">mdi-information-outline</v-icon>
                Customer Profile</v-toolbar-title
              >
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
              <table class="dt-profile">
                <tbody>
                  <tr>
                    <th class="text-left">Kode</th>
                    <th class="text-center">:</th>
                    <td class="text-left">{{ dataCustomer.kodeCustomer }}</td>
                  </tr>
                  <tr>
                    <th class="text-left">Nama</th>
                    <th class="text-center">:</th>
                    <td class="text-left">{{ dataCustomer.customer }}</td>
                  </tr>
                  <tr>
                    <th class="text-left">No Telp</th>
                    <th class="text-center">:</th>
                    <td class="text-left">{{ dataCustomer.noTelp }}</td>
                  </tr>
                  <tr>
                    <th class="text-left">Alamat</th>
                    <th class="text-center">:</th>
                    <td class="text-left">{{ dataCustomer.alamat }}</td>
                  </tr>
                  <tr>
                    <th class="text-left">Email</th>
                    <th class="text-center">:</th>
                    <td class="text-left">{{ dataCustomer.email }}</td>
                  </tr>
                  <tr>
                    <th class="text-left">NPWP</th>
                    <th class="text-center">:</th>
                    <td class="text-left">{{ dataCustomer.npwp }}</td>
                  </tr>
                </tbody>
              </table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!-- <v-dialog
        v-model="dialogFoto"
        max-width="50%"
        persistent
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-card-title style="background-color: #198900; color: white">
            <span style="font-size: 18px; padding-right: 10px"
              >Ubah Foto Profil</span
            >
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="(fotoName = ''), (fotoUpload = ''), (dialogFoto = false)"
              style="color: white"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" class="text-center">
                  <v-form ref="formFoto" lazy-validation>
                    <v-text-field
                      v-model="fotoName"
                      label="Pilih Foto"
                      prepend-inner-icon="mdi-paperclip"
                      @click="$refs.foto.click()"
                      outlined
                    />
                    <input
                      ref="foto"
                      type="file"
                      style="display: none"
                      accept="image/*"
                      @change="onFotoPicked"
                    />
                  </v-form>
                </v-col>
              </v-row>
            </v-container>
            <v-divider />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              @click="saveUbahFoto"
              :disabled="!fotoUpload.fileExtention"
              >Simpan</v-btn
            >
            <v-btn
              color="error"
              @click="(fotoName = ''), (fotoUpload = ''), (dialogFoto = false)"
              >Batal</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog> -->
      <v-dialog
        v-model="dialogPassword"
        max-width="50%"
        persistent
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-card-title style="background-color: #2B81D6; color: white">
            <span style="font-size: 18px; padding-right: 10px"
              >Ubah Password</span
            >
            <v-spacer></v-spacer>
            <v-btn icon @click="closePassword" style="color: white">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" class="text-center">
                  <v-form ref="formPass" lazy-validation>
                    <v-text-field
                      v-model="oldPassword"
                      :type="showPassLama ? 'text' : 'password'"
                      :append-icon="showPassLama ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="showPassLama = !showPassLama"
                      :rules="[(v) => !!v || 'Password Lama wajib diisi']"
                      label="Password Lama"
                      placeholder="Masukkan Password Lama"
                      outlined
                    />
                    <v-text-field
                      v-model="newPassword"
                      type="password"
                      label="Password Baru"
                      placeholder="Masukkan Password Baru"
                      outlined
                    />
                    <v-text-field
                      v-model="konfirmasi_password"
                      :type="showPass ? 'text' : 'password'"
                      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="showPass = !showPass"
                      :rules="newPassword != konfirmasi_password ?['Konfirmasi password salah!']:[]"
                      label="Konfirmasi Password Baru"
                      placeholder="Konfirmasi Password Baru"
                      outlined
                    />
                  </v-form>
                </v-col>
              </v-row>
            </v-container>
            <v-divider />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="validateAndSavePassword">Simpan</v-btn>
            <v-btn color="error" @click="closePassword">Batal</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>

<script>
import api from '@/service/api';

export default{
    data() {
        return {
    
            dialogPassword: false,
            dialogFoto: false,
            data_user: {},
            oldPassword: '',
            newPassword: '',
            konfirmasi_password: '',
            showPassLama: false,
            showPass: false,
            dataCustomer: this.$cookies.get('user'), 

    
        }
    },

    methods: {
    
        closePassword() {
            this.oldPassword = ""
            this.newPassword = ""
            this.konfirmasi_password = ""
            this.showPassLama = false
            this.showPass = false
            this.dialogPassword = false
        },

        async savePassword() {
      try {
        const token = this.$cookies.get(this.$config.tokenKey); // Mendapatkan token autentikasi

        // Langkah 1: Gunakan Endpoint Login untuk Verifikasi Password Lama
        const verifyPayload = {
          id: this.dataCustomer.id, // Gunakan ID user sebagai pengganti username
          password: this.oldPassword, // Password lama untuk verifikasi
          username: this.dataCustomer.username
        };

        const verifyResponse = await api.post(
          '/api/users/login',  // Gunakan endpoint login yang ada
          verifyPayload
        );

        if (verifyResponse.status === 200) {
          // Langkah 2: Update Password Baru
          const updatePayload = { newPassword: this.newPassword };
          const updateResponse = await api.put(
            `/api/users/${this.dataCustomer.id}/password`,
            updatePayload,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Pastikan menggunakan token jika diperlukan autentikasi
              },
            }
          );

          if (updateResponse.status === 200) {
            this.$toast.fire({
              icon: 'success',
              title: 'Password berhasil diperbarui', // Pesan sukses
            });
            this.closePassword(); // Tutup dialog setelah berhasil
          }
        }
      } catch (error) {
        // console.error('Error Save data:', error);
        this.$toast.fire({
          icon: 'error',
          title: 'Password Lama tidak sesuai', // Pesan error
        });
      }
    },



        // async savePassword() {
        //   try {
        //     // const token = this.$cookies.get(this.$config.tokenKey);

        //     const payload = {
        //       oldPassword: this.oldPassword,
        //       newPassword: this.newPassword,
        //       id: this.dataCustomer.id,
        //       isDeleted: false,
        //     };
        //     console.log('Data Add', payload);

        //     // Directly call the API to update the password
        //     // const apiCall = api.put(`/api/users/${this.dataCustomer.id}`, payload, {
        //     //   headers: { Authorization: `Bearer ${token}` },
        //     // });

        //     // await apiCall;
        //     // this.closePassword(); // Close the password dialog

        //     // this.$toast.fire({
        //     //   icon: 'success',
        //     //   title: 'Password berhasil diperbarui', // Success message
        //     // });
        //   } catch (error) {
        //     console.error('Error Save data:', error);
        //     this.$toast.fire({
        //       icon: 'error',
        //       title:
        //         error.response?.data?.message || 'Gagal Ubah Password',
        //     });
        //   } finally {
        //     this.loading = false;
        //   }
        // },
        
        validateAndSavePassword() {
            this.$refs.formPass.validate(); // Memvalidasi form
            if (this.$refs.formPass.validate()) {
                this.savePassword(); // Panggil metode savePassword jika validasi berhasil
            }
        },

        
    }
}
</script>
  
  <style lang="scss">
  table.dt-profile {
    width: 100%;
    th,
    td {
      border: 1px solid transparent !important;
      vertical-align: top;
      padding: 8px;
    }
  }

  .subheading {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    color: black;
  }
  </style>
  