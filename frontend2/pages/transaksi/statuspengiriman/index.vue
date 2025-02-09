<template>
    <v-container fluid>
      <v-card>
        <v-card-title>
          <v-icon color="primary" class="mr-2">mdi-bus-marker</v-icon>
          <h4>Lihat Status Pengiriman Material</h4>
        <v-spacer></v-spacer>
          <v-text-field
          v-model="deliveryId"
          label="Cari ID Pengiriman"
          dense
          outlined
          hide-details
          style="max-width: 350px;"
          class="mr-2"
          @keyup.enter="searchDelivery"
        ></v-text-field>
        <v-btn color="primary" @click="searchDelivery" :disabled="!deliveryId">
          <v-icon left>mdi-magnify</v-icon>Cari
        </v-btn>
        <v-btn 
        :disabled="!searched"
        text color="error" @click="resetForm">
        <v-icon left>mdi-refresh</v-icon>Reset
      </v-btn>
        </v-card-title>
        <v-divider></v-divider>
  
        <v-card-text>
          <v-alert
            v-if="!deliveries.length"
            type="warning"
            dense
            outlined
            color="error"
            class="mb-3"
          >
            Data pengiriman tidak ditemukan!
          </v-alert>
  
          <!-- Menampilkan daftar pengiriman berdasarkan id_customer -->
          <v-row no-gutters>
            <v-col
              v-for="delivery in paginatedDeliveries"
              :key="delivery.id"
              dense
              cols="12"
            >
              <v-card class="mb-2 card-with-icon-background" outlined hover @click="toggleDetails(delivery.id)">
                <v-card-title>
                   {{ delivery.nama_customer }}
                   <v-spacer></v-spacer>
                   <v-btn
                   style="margin-right: 20px;"
                     x-small
                     @click="printData(delivery.id)"
                   >
                     <v-icon small>mdi-printer-eye</v-icon>
                   </v-btn>
                   <!-- <v-btn
                   style="margin-right: 20px;"
                     x-small
                     @click="printData(delivery.id)"
                     :disabled="delivery.is_status !== '1'"
                   >
                     <v-icon small>mdi-printer-eye</v-icon>
                   </v-btn> -->
                  <v-icon>{{ expandedDeliveryId === delivery.id ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-card-title>
                <v-card-subtitle>
                  <v-icon x-small color="blue">mdi-file-document</v-icon>
                  {{ delivery.id }}
                </v-card-subtitle>
                <v-card-text>
                  <v-row align="center" justify="space-between">
                    <v-col>
                      <v-icon x-small color="red">mdi-clipboard-text-clock-outline</v-icon>
                      {{ $formatDate(delivery.tanggal_kirim) }}
                      <v-icon small right color="grey">mdi-arrow-right-bold</v-icon>
                      <v-icon small right color="orange">mdi-update</v-icon>
                      {{ $formatDate(delivery.updated_at) }}
                      <v-icon small right color="green">mdi-information-outline</v-icon>
                      {{ delivery.keterangan }}
                    </v-col>
                    <v-col>
                      <span style="display: flex; align-items: center; justify-content: flex-end;">
                        
                        <span style="margin-left: 12px;"></span>
                        <v-icon :color="getStatusIconColor(delivery.is_status)" small>mdi-circle-multiple</v-icon>
                        <span style="margin-left: 12px;">{{ getStatusText(delivery.is_status) }}</span>
                      </span>
                    </v-col>
                  </v-row>
                </v-card-text>
                <!-- Menampilkan detail material jika card diklik -->
                <v-expand-transition>
                  <div v-if="expandedDeliveryId === delivery.id" class="mt-2">
                    <v-divider></v-divider>
                    <v-list dense>
                      <v-list-item
                        v-for="(material, index) in delivery.details"
                        :key="index"
                      >
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ material.nama_material }} ({{ material.kode_material }})
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            Qty: {{ material.qty }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
          <v-pagination
          v-model="currentPage"
          :length="totalPages"
          @input="fetchPaginatedDeliveries"
          x-small
        ></v-pagination>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import api from "@/service/api";
  
  export default {
    data() {
      return {
        deliveryId: "",
        deliveries: [],
        originalDeliveries: [], // Salinan data asli
        searched: false,
        expandedDeliveryId: null, // ID pengiriman yang detailnya diperluas
        dataUser: this.$cookies.get('user'), 
        currentPage: 1,
        pageSize: 4,
        selectedDeliveryId: null
      };
    },

    computed: {
    // Menentukan jumlah halaman berdasarkan data dan pageSize
    totalPages() {
      return Math.ceil(this.deliveries.length / this.pageSize);
    },
    paginatedDeliveries() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.deliveries.slice(start, end);
    },
  },
    methods: {
        async fetchDeliveriesByCustomer(customerId) {
            try {
                this.$root.$emit("start-loading");
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Penundaan 1 detik

                // Cek jika customerId null, jika ya ambil semua pengiriman
                const endpoint = customerId 
                    ? `/api/delivery/customer/${customerId}` 
                    : '/api/delivery'; // Endpoint untuk mengambil semua data pengiriman

                const response = await api.get(endpoint); // Ambil data dari API
                const fetchedDeliveries = response.data.map((delivery) => ({
                    ...delivery,
                    details: delivery.details || [], // Pastikan ada array kosong jika tidak ada details
                }));

                this.deliveries = fetchedDeliveries; // Data untuk ditampilkan
                this.originalDeliveries = [...fetchedDeliveries]; // Salin data asli
            } catch (error) {
                console.error("Error fetching deliveries:", error);
                this.deliveries = [];
                this.originalDeliveries = [];
            } finally {
                this.$root.$emit("stop-loading");
            }
        },

      searchDelivery() {
        // Filter data yang sudah difetch berdasarkan deliveryId
        const filteredDeliveries = this.deliveries.filter((delivery) =>
        delivery.id.toLowerCase().includes(this.deliveryId.toLowerCase())
        );

        if (filteredDeliveries.length > 0) {
        this.deliveries = filteredDeliveries; // Tampilkan hasil pencarian
        this.currentPage = 1; // Reset ke halaman pertama
        } else {
        // this.$toast.warning("Data pengiriman tidak ditemukan");
        this.deliveries = []; // Kosongkan data jika tidak ditemukan
        }
        this.searched = true;

    },

    async printData(deliveryId) {
        if (!deliveryId) {
            alert('Tidak ada data yang dipilih');
            return;
        }

        try {
            this.$root.$emit("start-loading");
            const response = await api.get(`/api/report/generate?id=${deliveryId}`, {
                responseType: 'blob' // Pastikan respons diterima sebagai blob
            });
            // console.log(response);

            // Buat URL dari blob dan unduh file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.setAttribute('download', `laporan_${deliveryId}.pdf`); // Nama file yang akan diunduh
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Gagal mengambil laporan:', error);
            // Tampilkan pesan kesalahan kepada pengguna
        } finally {
            this.$root.$emit("stop-loading");
        }
    },

   
    resetForm() {
      this.deliveries = [...this.originalDeliveries]; // Kembalikan data ke aslinya
      this.currentPage = 1; // Reset ke halaman pertama
      this.deliveryId = ""; // Hapus input pencarian
      this.expandedDeliveryId = null; // Tutup semua detail yang diperluas
      this.searched = false;
    },

      fetchPaginatedDeliveries() {
      // Akan dipanggil saat halaman pagination berubah
      this.paginatedDeliveries; // Untuk memicu reactivity
    },
      toggleDetails(id) {
        this.expandedDeliveryId = this.expandedDeliveryId === id ? null : id;
        if (this.expandedDeliveryId) {
            this.selectedDeliveryId = id; // Set the selectedDeliveryId only when a card is expanded
        }
      },
    //   formatDate(date) {
    //     return date ? new Date(date).toLocaleDateString('ID') : '-';
    //   },
      getStatusText(status) {
        const statusMap = {
          1: "Sedang Dikirim",
          2: "Diterima Lab",
        };
        return statusMap[status] || "Tidak Diketahui";
      },
      getStatusIconColor(status) {
        // Menentukan warna untuk status
        const colorMap = {
          1: "blue",
          2: "green",
          3: "orange",
          4: "red",
        };
        return colorMap[status] || "gray";
      },
    },
    mounted() {
      const customerId = this.dataUser.idCustomer; // Ganti dengan ID pelanggan yang sesuai
      this.fetchDeliveriesByCustomer(customerId);
    },
  };
  </script>
  
  <style scoped>
  .v-container {
    max-width: 900px;
    margin: auto;
  }
  .card-with-icon-background {
  position: relative;
  background-color: #f5f5f5; /* Warna dasar latar belakang */
  overflow: hidden; /* Pastikan latar belakang tidak keluar dari kartu */
}

.card-with-icon-background::before {
  content: "\F5A9"; /* Unicode untuk ikon 'mdi-bus-marker' */
  font-family: "Material Design Icons";
  font-size: 120px; /* Ukuran ikon */
  color: rgba(0, 0, 0, 0.05); /* Warna ikon dengan transparansi */
  position: absolute;
  top: 50%; /* Posisi vertikal */
  left: 50%; /* Posisi horizontal */
  transform: translate(-50%, -50%);
  z-index: 0; /* Pastikan latar belakang di bawah konten kartu */
}

.card-with-icon-background > * {
  position: relative;
  z-index: 1; /* Konten di atas latar belakang */
}
  </style>
  