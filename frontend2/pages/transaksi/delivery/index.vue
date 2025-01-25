<template>
  <v-container fluid>
    <v-card>
      <v-card-text class="py-5">
        <div>
          <v-icon color="info" class="mr-2">mdi-truck</v-icon>
          <v-icon color="warning" class="mr-2">mdi-truck-delivery</v-icon>
          <v-icon color="success" class="mr-2">mdi-truck-fast</v-icon>
            <!-- <h3>Rencana Pengiriman Material</h3> -->
            <v-btn text type="submit" @click="startNewDelivery" :disabled="isFormActive" class="new-button">
              <span>Buat Rencana Pengiriman</span>
            </v-btn>
            <v-spacer></v-spacer>
        </div>
        <div class="form-group flex-container"></div>
          <v-divider /><div class="form-group flex-container"></div>
          <div class="form-group flex-container">
            <div>
              <label for="tanggal">Tanggal Kirim:</label>
              <input type="date" id="tanggal" :disabled="!isFormActive" v-model="tanggal" label="Tanggal Kirim" />
            </div>
            <v-divider vertical />
            <div class="flex-item">
              <label for="keterangan">Keterangan:</label>
              <input type="text" id="keterangan" autocomplete="off"
                :disabled="!isFormActive" v-model="keterangan"/>
            </div>
            <v-divider vertical />
            <div class="flex-item-button">
              <v-btn small elevation="7" @click="openSearchDialog"  :disabled="!isSearchButtonEnabled" v-model="search">
                <v-icon  elevation="7" title="search">mdi-magnify</v-icon>
              </v-btn>
            </div>
            <div class="flex-item-button">
              <v-btn small elevation="7" @click="saveTransaction" :disabled="!isSaveButtonEnabled">
                <v-icon  elevation="7" title="save">mdi-content-save</v-icon>
              </v-btn>
            </div>
            <div class="flex-item-button">
              <v-btn small elevation="7" @click="resetForm" :disabled="!isFormActive">
                <v-icon elevation="7" title="cancel">mdi-refresh</v-icon>
              </v-btn>
            </div>
          </div>
    <v-card outlined class="pa-2">
      <v-card-title>
        <v-icon color="primary" class="mr-2">mdi-cards-outline</v-icon>
        <h4>Daftar Material</h4>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        :headers="cartHeaders"
        :items="cart"
        dense
        outlined
        class="mt-4"
      >
        <template #item.actions="{ item }">
          <v-btn icon color="red" @click="removeFromCart(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Material Search Dialog -->
    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title class="text-h6 font-weight-medium">
          Pilih Material
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table
            :headers="materialHeaders"
            :items="materials"
            dense
            outlined
            class="mt-4"
          >
            <template #item.qtyInput="{ item }">
              <v-text-field
                v-model="item.qtyInput"
                label="Qty"
                dense
                outlined
                type="number"
                min="1"
                :disabled="isInCart(item)"
                class="mt-3"
                style="max-width: 80px; height: 50px;"
              />
            </template>
            <template #item.actions="{ item }">
              <v-btn
                color="primary"
                small
                :disabled="isInCart(item) || !item.qtyInput"
                @click="addToCart(item)"
                class="mt-1"
                style="height: 30px; line-height: 30px; padding: 0;"
              >
                <v-icon small>
                  mdi-plus
                </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDialog">Tutup</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card-text>
    </v-card>

  </v-container>
</template>

<script>
import api from '@/service/api';

export default {
  data() {
    return {
      dialog: false, // Kontrol dialog
      tanggal: "",
      keterangan: "",
      search: "",
      materials: [], // Data material dari backend
      cart: [], // Material yang dipilih
      materialHeaders: [
        { text: "Kode", value: "kode" },
        { text: "Nama", value: "nama" },
        { text: "Qty", value: "qtyInput", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      cartHeaders: [
        { text: "Kode", value: "kode" },
        { text: "Nama", value: "nama" },
        { text: "Qty", value: "qty" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      isFormActive: false,
      dataUser: this.$cookies.get('user'), 
      // isLoading: true, // Tambahkan state loading


    }
  },
  computed: {
      isSaveButtonEnabled() {
        return this.cart.length > 0;
      },
      isSearchButtonEnabled() {
        return this.tanggal;
      },
    //   isLoading() {
    //   return this.$store.state.loading;
    // },
  },
  
  methods: {
        startNewDelivery() {
          this.tanggal = "";
          this.keterangan = "";
          this.cart = [];
          this.isFormActive = true;
        },
        openSearchDialog() { 
          this.searchMaterial();
          this.dialog = true;
        },
        closeDialog() {
          this.dialog = false;
        },
        async searchMaterial() {
        
        const response = await api.get('/api/material/all', );
        const data = response.data.data.items;
        this.materials = data;
        console.log('material', this.materials)
        },
        isInCart(material) {
          return this.cart.some((item) => item.id === material.id);
        },
        addToCart(material) {
          if (!this.isInCart(material) && material.qtyInput > 0) {
            this.cart.push({
              id: material.id,
              kode: material.kode,
              nama: material.nama,
              qty: material.qtyInput,
            });
          }
        },
        removeFromCart(material) {
          this.cart = this.cart.filter((item) => item.id !== material.id);
          const index = this.materials.findIndex((m) => m.id === material.id);
          if (index !== -1) {
            this.materials[index].qtyInput = null;
          }
        },
        resetForm() {
        // Mengosongkan semua inputan dan keranjang material
        this.tanggal = "";
        this.keterangan = "";
        this.cart = [];
        this.materials.forEach((material) => {
          material.qtyInput = null; // Reset qty input jika ada
        });
        this.isFormActive = false
      },
      async saveTransaction() {
        // Validasi input
        if (!this.tanggal) {
          alert("Tanggal kirim harus diisi!");
          return;
        }
        if (!this.keterangan) {
          alert("Keterangan harus diisi!");
          return;
        }
        if (this.cart.length === 0) {
          alert("Keranjang material tidak boleh kosong!");
          return;
        }

        // Data yang akan dikirim ke backend
        const transactionData = {
          delivery: {
            docNo: '123456', // Format docNo dinamis
            tanggalKirim: this.tanggal,
            idCustomer: this.dataUser.idCustomer,
            keterangan: this.keterangan,
            isStatus: "1", // Sesuaikan dengan status yang diinginkan
            createdBy: this.dataUser.id,
          },
          details: this.cart.map((item) => ({
            idMaterial: item.id,
            qty: item.qty,
            })),
        };


        try {
          // Simpan transaksi ke backend
          this.$root.$emit("start-loading"); // Mulai loading
          const result = await this.$showConfirmationDialog();
            if(result.isConfirmed) {
              await new Promise((resolve) => setTimeout(resolve, 1000)); // Tambahkan penundaan 1 detik
              await api.post('/api/delivery', transactionData);
              this.$toast.fire({
                icon: 'success',
                title: 'Data berhasil disimpan',
              });
              this.resetForm();
          }
          } catch (error) {
            console.error('Error saving transaction:', error);
            // alert("Gagal menyimpan transaksi. Silakan coba lagi.");
            this.$toast.fire({
            icon: 'error',
            title: error.response?.data?.message ,
              });
          } finally {
          this.$root.$emit('stop-loading'); // Tampilkan garis loading
          }
        }
      },

  mounted() {
    setTimeout(() => {
      this.isLoading = false; // Hentikan loading setelah 1 detik
    }, 1000); // Ubah durasi sesuai kebutuhan
  }
};
</script>

<style scoped>
.v-container {
  max-width: 900px;
  margin: auto;
}
.v-card-title {
  align-items: center;
}
  
  .flex-container {
    display: flex;
    gap: 10px;
  }
  
  .flex-item {
    flex: 1;
  }
  
  .form-group {
    margin-top: 15px;
    margin-bottom: 10px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 12px;
    /* Adjust the font size */
    margin: 0;
    /* Adjust the margin */
  }
  
  .form-group input {
    width: 100%;
    padding: 4px;
    /* Adjust the padding */
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 12px;
    /* Adjust the font size */
    height: 25px;
    /* Adjust the height */
  }
  
  .flex-item-button {
    margin-top: 15px;
  }
  
  .new-button {
    background-color: #0681cdac;
    color: white;
    /* border: none; */
    /* border-radius: 8px; */
    cursor: pointer;
    /* height: 33px; */
    /* font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; */
  }
  
  .new-button:disabled {
    background-color: #98949452;
    cursor: not-allowed
  }
  
  .new-button:hover:enabled {
    background-color: rgb(32, 158, 93);
  }
  

 
  
  
</style>
