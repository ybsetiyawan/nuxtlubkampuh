<template>
    <div>
      <data-table
        ref="dataTable"
        :headers="headers"
        :items="items"
        title="Data Company"
        searchTitle="Cari Company"
        :meta="meta"
        :fetch-data="fetchData"
        :transform-response="transformResponse"
        default-sort-by="nama"
        default-sort-type="ASC"
        @add-item="openAddDialog"
        @edit-item="handleEditItem"
        :show-add-button="false"
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
          { text: 'Nama', value: 'nama', sortable: false },
          { text: 'Alamat', value: 'alamat', sortable: false },
          { text: 'No Telp', value: 'noTelp', sortable: false },
          { text: 'Email', value: 'email', sortable: false },
          { text: 'Website', value: 'website', sortable: false },
          { text: 'Bank', value: 'bank', sortable: false },
          { text: 'Bank No', value: 'bankNo', sortable: false },
          { text: 'Bank A/n', value: 'bankAn', sortable: false },
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
            text: 'Alamat',
            value: 'alamat',
            type: 'text',
            required: true,
            rules: [(v) => !!v || 'Alamat  harus diisi'],
          },
          {
            text: 'No Telp',
            value: 'noTelp',
            type: 'text',
            required: true,
            rules: [(v) => !!v || 'No Telp  harus diisi'],
          },
          {
            text: 'Email',
            value: 'email',
            type: 'text',
            required: true,
            rules: [(v) => !!v || 'email harus diisi'],
          },
          { text: 'website', value: 'website', type: 'text' },
          { text: 'Bank', value: 'bank', type: 'text' },
          { text: 'Bank No', value: 'bankNo', type: 'text' },
          { text: 'Bank A/n', value: 'bankAn', type: 'text' },
        ],
        meta: {},
        edit: {
          nama: '',
          alamat: '',
          noTelp: '',
          email: '',
          website: '',
          bank: '',  
          bankNo: '',  
          bankAn: '',  
        },
        isEditMode: false, // Tambahkan ini
      };
    },
    methods: {
      async fetchData(filter) {
        const token = this.$cookies.get(this.$config.tokenKey);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return await api.get('/api/company/all', {
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
            nama: formData.nama,
            alamat: formData.alamat || null,
            noTelp: formData.noTelp,
            email: formData.email || null,
            website: formData.website || null,
            bank: formData.bank,
            bankNo: formData.bankNo,
            bankAn: formData.bankAn,
            isDeleted: false,
          };

          console.log('Data',payload);
  
          let apiCall;
          if (isEdit) {
            apiCall = api.put(`/api/company/${this.edit.id}`, payload, {
              headers: { Authorization: `Bearer ${token}` },
            });
          } else {
            apiCall = api.post(`/api/company`, payload, {
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
          const result = await this.$showConfirmationDialog();
  
          if (result.isConfirmed) {
            const token = this.$cookies.get(this.$config.tokenKey);
            await api.delete(`/api/company/${data.id}`, {
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
          nama: '',
          alamat: '',
          noTelp: '',
          email: '',
          website: '',
          bank: '',  
          bankNo: '',  
          bankAn: '',  
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
          nama: item.nama || '',
          alamat: item.alamat || '',
          noTelp: item.noTelp || '',
          email: item.email || '',
          website: item.website || '',
          bank: item.bank || '' ,
          bankNo: item.bankNo || '' ,
          bankAn: item.bankAn || '' ,
        };
        this.dialog = true;
      },
    },
  };
  </script>
  

