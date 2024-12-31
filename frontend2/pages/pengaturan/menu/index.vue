<template>
  <div>
    <v-tabs v-model="tab">
      <v-tab v-for="item in tabs" :key="item">{{ item }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <data-table
          ref="dataTable"
          :headers="menuHeaders"
          :items="menuItems"
          title="Data Menu"
          searchTitle="Cari Menu"
          :meta="meta"
          :fetch-data="fetchData"
          :transform-response="transformResponse"
          default-sort-by="link_menu"
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
            @close="closeDialog" >
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
      </v-tab-item>
      <v-tab-item>
        <data-table
          ref="dataTable"
          :headers="menuHeaders2"
          :items="menuItems2"
          title="Data Menu by Role"
          searchTitle="Cari Menu"
          :meta="meta"
          :fetch-data="fetchData2"
          :transform-response="transformResponse"
          default-sort-by="id_role"
          default-sort-type="ASC"
          @add-item="openAddDialog2"
          @edit-item="handleEditItem2"
          />
        <v-form ref="form2">
          <form-dialog
            v-model="dialogMenu"
            :title="dialogTitleMenu"
            :fields="formFields2"
            :initial-data="edit2"
            :loading="loading"
            :is-edit-mode="isEditMode"
            @save="save2"
            @delete="deleteItem"
            @close="closeDialogMenu" >
            <v-text-field 
              v-for="field in formFields2"
              :key="field.value"
              v-model="edit[field.value]"
              :label="field.text"
              :type="field.type"
              :rules="field.rules"
              :required="field.required"
              ></v-text-field>
          </form-dialog>
        </v-form>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>


<script>
import menu from './menu'
import menu2 from './menu2'
import DataTable from '@/components/common/DataTable.vue';
import FormDialog from '~/components/common/FormDialog.vue';

export default {

  mixins: [menu, menu2],

  components: {
    DataTable,
    FormDialog,
  },
  // data() {
  //   return {
  //     tab: 0,
  //     tabs: ['Data Menu', 'Menu User'],
  //     menuItems: [],
  //     menuHeaders: [
  //       { text: 'No', value: 'no', width: '68px', sortable: false },
  //       { text: 'Nama Menu', value: 'namaMenu', sortable: false },
  //       { text: 'Link Menu', value: 'linkMenu', sortable: false },
  //       { text: 'Class Icon', value: 'classIcon', sortable: false },
  //       { text: 'Keterangan', value: 'keterangan', sortable: false },
  //     ],

  //     menuHeaders2: [
  //       { text: 'No', value: 'no', width: '68px', sortable: false },
  //       { text: 'Nama Menu', value: 'namaMenu', sortable: false },
  //       { text: 'Nama Parent', value: 'namaParent', sortable: false },
  //       { text: 'Link Menu', value: 'linkMenu', sortable: false },
  //       { text: 'Urutan', value: 'urutan', sortable: false },
  //       { text: 'Level', value: 'level', sortable: false },
  //       { text: 'Nama Role', value: 'namaRole', sortable: false },
  //     ],

  //     dialog: false,
  //     dialogTitle: '',
  //     loading: false,
  //     formFields: [
  //       {
  //         text: 'Nama Menu',
  //         value: 'namaMenu',
  //         type: 'text',
  //         required: true,
  //         rules: [
  //           (v) => !!v || 'Nama menu harus diisi',
  //           (v) => v.length >= 3 || 'Nama menu minimal 3 karakter',
  //         ],
  //       },
  //       {
  //         text: 'Link Menu',
  //         value: 'linkMenu',
  //         type: 'text',
  //         required: true,
  //         rules: [(v) => !!v || 'Link menu harus diisi'],
  //       },
  //       { text: 'Class Icon', value: 'classIcon', type: 'text' },
  //       { text: 'Keterangan', value: 'keterangan', type: 'text' },
  //     ],
  //     meta: {},
  //     edit: {
  //       namaMenu: '',
  //       linkMenu: '',
  //       classIcon: '',
  //       keterangan: '',
  //     },
  //     isEditMode: false, // Tambahkan ini
  //   };
  // },
  // methods: {
  //   async fetchData(filter) {
  //     const token = this.$cookies.get(this.$config.tokenKey);
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     return await api.get('/api/menu', {
  //       headers: { Authorization: `Bearer ${token}` },
  //       params: filter,
  //     });
  //   },

  //   async fetchData2(filter) {
  //     const token = this.$cookies.get(this.$config.tokenKey);
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     return await api.get('/api/menu-user/all', {
  //       headers: { Authorization: `Bearer ${token}` },
  //       params: filter,
  //     });
  //   },

  //   async save(formData) {
      
  //     if (!this.$refs.form.validate()) {
  //       this.$toast.fire({
  //         icon: 'error',
  //         title: 'Form tidak valid, silahkan isi data dengan benar!',
  //       });
  //       return
  //     }
  //     this.loading = true;
  //     try {
  //     const token = this.$cookies.get(this.$config.tokenKey);
  //     const isEdit = !!this.edit.id;

  //     const payload = {
  //       namaMenu: formData.namaMenu,
  //       linkMenu: formData.linkMenu,
  //       keterangan: formData.keterangan || null,
  //       classIcon: formData.classIcon || null,
  //       isDeleted: false,
  //     };
  //     const apiCall = isEdit
  //       ? api.put(`/api/menu/${this.edit.id}`, payload, {
  //           headers: { Authorization: `Bearer ${token}` },
  //         })
  //       : api.post(`/api/menu`, payload, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //     await apiCall;
  //     this.closeDialog();
  //     if (this.$refs.dataTable) {
  //       await this.$refs.dataTable.loadData();
  //     }
  //     this.$toast.fire({
  //       icon: 'success',
  //       title: isEdit
  //         ? 'Data berhasil diperbarui'
  //         : 'Data berhasil ditambahkan',
  //     });
  //     } catch (error) {
  //       console.error('Error Save data:', error);
  //       this.$toast.fire({
  //         icon: 'error',
  //         title:
  //           error.response?.data?.message || 'Gagal menyimpan data',
  //       });
  //     } finally {
  //       this.loading = false;
  //     }
  //   },

  //   async deleteItem(data) {
  //     try {
  //       // Menyesuaikan tampilan dialog konfirmasi dengan tema dark
  //       const result = await this.$swal.fire({
  //         title: 'Apakah Anda yakin?',
  //         text: 'Data ini akan dihapus dan tidak bisa dikembalikan!',
  //         icon: 'warning',
  //         showCancelButton: true,
  //         confirmButtonColor: '#3085d6',
  //         cancelButtonColor: '#d33',
  //         confirmButtonText: 'Ya, hapus!',
  //         cancelButtonText: 'Batal',
  //         background: '#333',  // Dark background
  //         color: '#fff',  // White text
  //         iconColor: '#f39c12', // Yellow icon for warning
  //         width: '450px',  // Adjust width of the popup
  //       });

  //       if (result.isConfirmed) {
  //         const token = this.$cookies.get(this.$config.tokenKey);
  //         await api.delete(`/api/menu/${data.id}`, {
  //           headers: { Authorization: `Bearer ${token}` },
  //         });

  //         this.closeDialog();
  //         if (this.$refs.dataTable) {
  //         await this.$refs.dataTable.loadData();
  //       }
  //         this.$toast.fire({
  //           icon: 'success',
  //           title: 'Data berhasil dihapus',
  //         });
  //       }
  //       } catch (error) {
  //       this.$toast.fire({
  //       icon: 'error',
  //       title: error.response?.data?.message || 'Gagal menghapus data',
  //         });
  //       }
  //   },

  //   transformResponse(response) {
  //     return {
  //       items: response.data.data.items,
  //       meta: response.data.data.meta,
  //     };
  //   },

  //   openAddDialog() {
  //     this.isEditMode = false; // Atur ke mode tambah
  //     this.dialogTitle = 'Tambah Data';
  //     this.edit = {
  //       namaMenu: '',
  //       linkMenu: '',
  //       classIcon: '',
  //       keterangan: '',
  //     };
  //     this.dialog = true;
  //   },

  //   closeDialog() {
  //     this.dialog = false;
  //   },

  //   handleEditItem(item) {
  //     this.isEditMode = true; // Atur ke mode edit
  //     this.dialogTitle = 'Edit Menu';
  //     this.edit = {
  //       id: item.id,
  //       namaMenu: item.namaMenu || '',
  //       linkMenu: item.linkMenu || '',
  //       classIcon: item.classIcon || '',
  //       keterangan: item.keterangan || '',
  //     };
  //     this.dialog = true;
  //   },
  // },
};
</script>
