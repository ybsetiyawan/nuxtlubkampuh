<template>
  <div>
    <data-table
      ref="dataTable"
      :headers="menuHeaders"
      :items="menuItems"
      title="Data Menu"
      searchTitle="Cari Menu"
      :meta="meta"
      :footer-props="footerProps"
      :fetch-data="fetchMenuData"
      :transform-response="transformResponse"
      default-sort-by="nama_menu"
      default-sort-type="ASC"
      @add-item="openAddDialog"
    />
    <form-dialog
      v-model="dialog"
      :title="'Tambah Menu Baru'"
      :fields="formFields"
      :loading="loading"
      @save="save"
      @close="closeDialog"
    />



  </div>

  </template>
  
  <script>
  import api from '@/service/api';
  import DataTable from '@/components/common/DataTable.vue';
  import FormDialog from '~/components/common/FormDialog.vue';
  
  
  export default {
    components: {
      DataTable,
      FormDialog
    },
    data() {
      return {
        
        menuItems: [],
        menuHeaders: [
          { 
            text: 'No',
            value: 'no',
            width: '68px',
           sortable: false  // Menghilangkan sort untuk kolom ini
          },
          { 
            text: 'Nama Menu', 
            value: 'namaMenu',
            sortable: false
          },
          { 
            text: 'Link Menu', 
            value: 'linkMenu',
            sortable: false
          },
          { 
            text: 'Class Icon', 
            value: 'classIcon',
            sortable: false
          },
          { 
            text: 'Keterangan', 
            value: 'keterangan',
            sortable: false
          }
        ],
        dialog: false,
        loading: false,
        formFields: [
          {
            text: 'Nama Menu',
            value: 'namaMenu',
            type: 'text',
            required: true,
            rules: [
              v => !!v || 'Nama menu harus diisi',
              v => v.length >= 3 || 'Nama menu minimal 3 karakter'
            ]
          },
          {
            text: 'Link Menu',
            value: 'linkMenu',
            type: 'text',
            required: true,
            rules: [v => !!v || 'Link menu harus diisi']
          },
          {
            text: 'Class Icon',
            value: 'classIcon',
            type: 'text'
          },
          {
            text: 'Keterangan',
            value: 'keterangan',
            type: 'text'
          },
          
        ],
        
        meta: {},
        footerProps: {
          'items-per-page-options': [10, 20, 40, 50],
        },
      };
    },
    methods: {
      // Function untuk fetch data yang akan dikirim sebagai prop
      async fetchMenuData(filter) {
        const token = this.$cookies.get(this.$config.tokenKey);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return await api.get('/api/menu', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: filter
        });
      },
    
      async save(formData) {
        this.loading = true
        try {
          const token = this.$cookies.get(this.$config.tokenKey);
          // kirim data ke backend
          const payload = {
            namaMenu: formData.namaMenu,
            linkMenu: formData.linkMenu,
            keterangan: formData.keterangan || null,
            classIcon: formData.classIcon || null
          };
          await api.post('/api/menu', payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          this.closeDialog();
          if (this.$refs.dataTable) {
          await this.$refs.dataTable.loadData();
        }
        
        // Tampilkan snackbar sukses
          this.$toast.fire({
            icon: 'success',
            title: 'Data berhasil ditambahkan'
          });
        } catch (error) {
          console.error('Error Save data:' , error);
          this.$toast.fire({
            icon: 'error',
            title: error.response?.data?.message || 'Gagal menambahkan data'
         });
        } finally {
          this.loading = false;
        }
      },

      // Function untuk transform response sesuai struktur API
      transformResponse(response) {
        return {
          items: response.data.data.items,
          meta: response.data.data.meta
        }
    },
    openAddDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
   
    },
  };
  </script>