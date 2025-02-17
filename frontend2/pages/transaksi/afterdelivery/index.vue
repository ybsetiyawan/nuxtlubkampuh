<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-icon color="primary" class="mr-2">mdi-truck-check</v-icon>
        <h4>Kelola Penerimaan Material</h4>
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
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-alert
          v-if="items.length && searched"
          type="warning"
          dense
          outlined
          color="error"
          class="mb-3"
        >
          Harap pastikan terlebih dahulu data pengiriman yang akan di update.
        </v-alert>
      </v-card-text>

      <v-card-text>
        <v-alert
          v-if="!items.length && searched"
          type="warning"
          dense
          outlined
          color="error"
          class="mb-3"
        >
          Data pengiriman tidak ditemukan!
        </v-alert>
        <v-data-table
          v-if="items.length"
          :headers="headers"
          :items="items"
          dense
          outlined
        >
          <template #item.qtyPhysical="{ item }">
            <v-text-field
              v-model="item.qtyPhysical"
              dense
              outlined
              type="number"
              min="0"
              style="max-width: 75px; height: 40px;"
            ></v-text-field>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="success"
          :disabled="!items.length"
          @click="updateStatus"
        >
          <v-icon left>mdi-content-save</v-icon>Update Status
        </v-btn>
        <v-btn 
          :disabled="!searched"
          text color="error" @click="resetForm">
          <v-icon left>mdi-refresh</v-icon>Reset
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import api from "@/service/api";

export default {
  data() {
    return {
      deliveryId: "",
      items: [],
      searched: false,
      headers: [
        { text: "Tanggal", value: "tanggalKirim" },
        { text: "Nama", value: "namaCustomer" },
        { text: "Kode", value: "kode_material" },
        { text: "Nama", value: "nama_material" },
        { text: "Qty Kirim", value: "qty" },
        { text: "Qty Fisik", value: "qtyPhysical" },
      ],
      dataUser: this.$cookies.get('user'), 
    };
  },
  methods: {
  async searchDelivery() {
    if (!this.deliveryId) {
      alert("Masukkan ID Pengiriman!");
      return;
    }
    try {
      this.$root.$emit("start-loading"); // Mulai loading
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Tambahkan penundaan 1 detik
      const response = await api.get(`/api/delivery/${this.deliveryId}`);
      // console.log('Response delivery:', response.data);

      // Ambil detail dari response.data.details
      const delivery = response.data;
      this.items = delivery.details.map((item) => ({
        ...item,
        qtyPhysical: item.qty, // Default qty fisik sama dengan qty kirim
        docNo: delivery.doc_no, // Menambahkan docNo ke setiap item
        idCustomer: delivery.id_customer,
        tanggalKirim: this.$formatDate(delivery.tanggal_kirim),
        keterangan: delivery.keterangan,
        namaCustomer: delivery.nama_customer,
      }));

      console.log('Data delivery items:', this.items);
      this.searched = true;
    } catch (error) {
      console.error("Error fetching delivery:", error);
      this.items = [];
      this.searched = true;
    } finally {
      this.$root.$emit("stop-loading"); // Mulai loading
      
    }
},

async updateStatus() {
  if (!this.items.length) {
    alert("Tidak ada data untuk diperbarui!");
    return;
  }

  // Periksa apakah docNo dan idCustomer ada
  const firstItem = this.items[0];
  const docNo = firstItem ? firstItem.docNo : null;
  const idCustomer = firstItem ? firstItem.idCustomer : null;
  const tanggalKirim = firstItem ? firstItem.tanggalKirim : null;
  const keterangan = firstItem ? firstItem.keterangan : null;
 
  
  // if (!docNo) {
  //   alert("docNo tidak ditemukan!");
  //   return;
  // }

  // if (!idCustomer) {
  //   alert("idCustomer tidak ditemukan!");
  //   return;
  // }

  // if (!tanggalKirim) {
  //   alert("tanggal kirim tidak ditemukan!");
  //   return;
  // }

  // Periksa apakah details adalah array
  const details = this.items.map(({ id_detail, qtyPhysical }) => ({
    idDetail: id_detail,
    qty: qtyPhysical,
  }));

  // // Pastikan bahwa details tidak kosong
  // if (!details.length) {
  //   alert("Tidak ada detail material untuk diperbarui!");
  //   return;
  // }

  // Membuat payload dengan format yang sesuai
  const payload = {
    docNo: docNo, // Menambahkan docNo ke dalam payload
    tanggalKirim: tanggalKirim, // Pastikan tanggal kirim diambil dari state atau input
    idCustomer: idCustomer, // Menambahkan idCustomer ke dalam payload
    isStatus: 2, // Status pengiriman
    updatedBy: this.dataUser.id, // User yang melakukan update, sesuaikan dengan state aplikasi
    keterangan: keterangan, // Array detail material
    details: details, // Array detail material
  };

  // Log payload untuk memastikan format sesuai
  console.log("Payload untuk update status:", payload);

  try {
    this.$root.$emit("start-loading");
    const result = await this.$showConfirmationDialog();
    if (result.isConfirmed) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Tambahkan penundaan 1 detik
      await api.put(`/api/delivery/${this.deliveryId}`, payload);
      this.$toast.fire({
        icon: "success",
        title: "Data berhasil diperbarui",
      });
      this.resetForm(); // Reset form setelah update berhasil
    }
  } catch (error) {
    console.error("Error updating delivery status:", error);
    this.$toast.fire({
      icon: "error",
      title: error.response?.data?.message || "Gagal memperbarui status!",
    });
  } finally {
    this.$root.$emit("stop-loading");
  }
},

// formatDate(date) {
//         return date ? new Date(date).toLocaleDateString('ID') : '-';
//       },




    resetForm() {
      this.deliveryId = "";
      this.items = [];
      this.searched = false;
    },
  },
};
</script>

<style scoped>
.v-container {
  max-width: 900px;
  margin: auto;
}
</style>
