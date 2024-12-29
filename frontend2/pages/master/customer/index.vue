<template>
    <div>
      <data-table
        ref="dataTable"
        :headers="headers"
        :items="items"
        title="Data Customer"
        searchTitle="Cari Customer"
        :meta="meta"
        :fetch-data="fetchData"
        :transform-response="transformResponse"
        default-sort-by="kode"
        default-sort-type="ASC"
        @add-item="openAddDialog"
        @edit-item="handleEditItem"
      />
      <v-form ref="form">
      <form-dialog
        v-model="dialog"
        :title="dialogTitle"
        :fields="formFields"
        :initial-data="edit"
        :loading="loading"
        :is-edit-mode="isEditMode"
        @save="save"
        @delete="deleteItem"
        @close="closeDialog"
      >
        <v-text-field
          v-for="field in formFields"
          :key="field.value"
          v-model="edit[field.value]"
          :label="field.text"
          :type="field.type"
          :rules="field.rules"
          :required="field.required"
        ></v-text-field>
      </form-dialog>
      </v-form>
    </div>
  </template>
  
  <script>
  import api from '@/service/api';
  import DataTable from '@/components/common/DataTable.vue';
  import FormDialog from '~/components/common/FormDialog.vue';
  
  export default {
    // middleware: 'auth',
    // meta: {
    //   requiresRole: ['HA02'], // Hanya untuk admin
    // },
    components: {
      DataTable,
      FormDialog,
    },
    data() {
      return {
        items: [],
        headers: [
          { text: 'No', value: 'no', width: '68px', sortable: false },
          { text: 'Kode', value: 'kode', sortable: false },
          { text: 'nama', value: 'nama', sortable: false },
          { text: 'No Telp', value: 'noTelp', sortable: false },
          { text: 'Alamat', value: 'alamat', sortable: false },
          { text: 'Email', value: 'email', sortable: false },
          { text: 'Npwp', value: 'npwp', sortable: false },
        //   { text: 'Link Menu', value: 'linkMenu', sortable: false },
        //   { text: 'Class Icon', value: 'classIcon', sortable: false },
        //   { text: 'Keterangan', value: 'keterangan', sortable: false },
        ],
        dialog: false,
        dialogTitle: '',
        loading: false,
        formFields: [
            
          {
            text: 'Nama',
            value: 'nama',
            type: 'text',
            required: true,
            rules: [
              (v) => !!v || 'Nama harus diisi',
              (v) => v.length >= 3 || 'Nama minimal 3 karakter',
            ],
          },
          {
            text: 'No Telp',
            value: 'noTelp',
            type: 'text',
            required: true,
            rules: [(v) => !!v || 'No Telp  harus diisi'],
          },
          {
            text: 'Alamat',
            value: 'alamat',
            type: 'text',
            required: true,
            rules: [(v) => !!v || 'Alamat  harus diisi'],
          },
          {
            text: 'Email',
            value: 'email',
            type: 'text',
            required: true,
            rules: [(v) => !!v || 'email harus diisi'],
          },
          { text: 'Npwp', value: 'npwp', type: 'text' },
        ],
        meta: {},
        edit: {
          kode: '',  
          nama: '',
          noTelp: '',
          alamat: '',
          email: '',
          npwp: '',
        },
        isEditMode: false, // Tambahkan ini
      };
    },
    methods: {
      async fetchData(filter) {
        const token = this.$cookies.get(this.$config.tokenKey);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return await api.get('/api/customer', {
          headers: { Authorization: `Bearer ${token}` },
          params: filter,
        });
      },
  
      async save(formData) {
        if (!this.$refs.form.validate()) {
          this.$toast.fire({
            icon: 'error',
            title: 'Form tidak valid, silahkan isi data dengan benar!',
          });
          return
        }
        this.loading = true;
        try {
          const token = this.$cookies.get(this.$config.tokenKey);
          const isEdit = this.edit.id;
  
          const payload = {
            kode: formData.kode,
            nama: formData.nama,
            noTelp: formData.noTelp,
            alamat: formData.alamat || null,
            email: formData.email || null,
            npwp: formData.npwp || null,
            isDeleted: false,
          };

          console.log('Data',payload);
  
          let apiCall;
          if (isEdit) {
            apiCall = api.put(`/api/customer/${this.edit.id}`, payload, {
              headers: { Authorization: `Bearer ${token}` },
            });
          } else {
            apiCall = api.post(`/api/customer`, payload, {
              headers: { Authorization: `Bearer ${token}` },
            });
          }
  
          await apiCall;
          this.closeDialog();
          if (this.$refs.dataTable) {
            await this.$refs.dataTable.loadData();
          }
          this.$toast.fire({
            icon: 'success',
            title: isEdit
              ? 'Data berhasil diperbarui'
              : 'Data berhasil ditambahkan',
          });
        } catch (error) {
          console.error('Error Save data:', error);
          this.$toast.fire({
            icon: 'error',
            title:
              error.response?.data?.message || 'Gagal menambahkan data',
          });
        } finally {
          this.loading = false;
        }
      },
  
      async deleteItem(data) {
        try {
          // Menyesuaikan tampilan dialog konfirmasi dengan tema dark
          const result = await this.$swal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Data ini akan dihapus dan tidak bisa dikembalikan!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
            background: '#333',  // Dark background
            color: '#fff',  // White text
            iconColor: '#f39c12', // Yellow icon for warning
            width: '450px',  // Adjust width of the popup
          });
  
          if (result.isConfirmed) {
            const token = this.$cookies.get(this.$config.tokenKey);
            await api.delete(`/api/customer/${data.id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
  
            this.closeDialog();
            if (this.$refs.dataTable) {
            await this.$refs.dataTable.loadData();
          }
            this.$toast.fire({
              icon: 'success',
              title: 'Data berhasil dihapus',
            });
          }
          } catch (error) {
          this.$toast.fire({
          icon: 'error',
          title: error.response?.data?.message || 'Gagal menghapus data',
            });
          }
      },
  
      transformResponse(response) {
        return {
          items: response.data.data.items,
          meta: response.data.data.meta,
        };
      },
  
      openAddDialog() {
        this.isEditMode = false; // Atur ke mode tambah
        this.dialogTitle = 'Tambah Data';
        this.edit = {
          kode:'',  
          nama: '',
          noTelp: '',
          alamat: '',
          email: '',
          npwp: '',
        };
        this.dialog = true;
      },
  
      closeDialog() {
        this.dialog = false;
      },
  
      handleEditItem(item) {
        this.isEditMode = true; // Atur ke mode edit
        this.dialogTitle = 'Edit Data';
        // tampilkan data saat edit
        this.edit = {
          id: item.id || '',
          kode: item.kode || '' ,
          nama: item.nama || '',
          noTelp: item.noTelp || '',
          alamat: item.alamat || '',
          email: item.email || '',
          npwp: item.npwp || '',
        };
        this.dialog = true;
      },
    },
  };
  </script>
  