<template>
    <div>
      <data-table
        ref="dataTable"
        :headers="menuHeaders"
        :items="menuItems"
        title="Data Role"
        searchTitle="Cari Role"
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
  
    
    components: {
      DataTable,
      FormDialog,
    },
    data() {
      return {
        menuItems: [],
        menuHeaders: [
          { text: 'No', value: 'no', width: '68px', sortable: false },
          { text: 'Kode', value: 'kode', sortable: false },
          { text: 'Nama', value: 'nama', sortable: false }, 
        ],
        dialog: false,
        dialogTitle: '',
        loading: false,
        formFields: [
  
          {
            text: 'Kode',
            value: 'kode',
            type: 'text',
            required: true,
            rules: [
              (v) => !!v || 'Kode harus diisi',
              (v) => v.length >= 4 || 'Kode minimal 4 karakter',
            ],
          },
          {
            text: 'Nama',
            value: 'nama',
            type: 'text',
            required: true,
            rules: [
              (v) => !!v || 'Nama harus diisi',
            ],
          },
          
        ],
        meta: {},
        edit: {
          kode: '',
          nama: '',
        },
        isEditMode: false, // Tambahkan ini
      };
    },
    methods: {
  
  
      async fetchData(filter) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return await api.get('/api/roles/all', {
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
            isDeleted: false,
          };
          console.log('Data Add', payload);
  
          let apiCall;
          if (isEdit) {
            apiCall = api.put(`/api/roles/${this.edit.id}`, payload, {
              headers: { Authorization: `Bearer ${token}` },
            });
          } else {
            apiCall = api.post(`/api/roles`, payload, {
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
            await api.delete(`/api/roles/${data.id}`, {
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
          console.error('Error Delete data:', error);
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
  
      async openAddDialog() {
        this.isEditMode = false; // Atur ke mode tambah
        this.dialogTitle = 'Tambah Data';
        this.edit = {
          kode:'',
          nama: '',
        };
        this.dialog = true;
        // this.updateRoleOptions();
      },
  
      closeDialog() {
        this.dialog = false;
      },
  
      handleEditItem(item) {
        this.isEditMode = true; // Atur ke mode edit
        this.dialogTitle = 'Edit Data';
        this.edit = {
          id: item.id,
          kode: item.kode || '',
          nama: item.nama || '',
        };
        this.dialog = true;
        // this.updateRoleOptions();
  
      },
    },
  };
  </script>
  