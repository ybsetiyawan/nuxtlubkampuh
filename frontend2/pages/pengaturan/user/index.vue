<template>
  <div>
    <data-table
      ref="dataTable"
      :headers="menuHeaders"
      :items="menuItems"
      title="Data User"
      searchTitle="Cari User"
      :meta="meta"
      :fetch-data="fetchData"
      :transform-response="transformResponse"
      default-sort-by="username"
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
        { text: 'User', value: 'user', sortable: false }, 
        { text: 'Username', value: 'username', sortable: false }, 
        { text: 'Role', value: 'role', sortable: false },
      ],
      dialog: false,
      dialogTitle: '',
      loading: false,
      formFields: [

        {
          text: 'User',
          value: 'user',
          type: 'text',
          required: true,
          rules: [
            (v) => !!v || 'Nama harus diisi',
            (v) => v.length >= 5 || 'Nama minimal 5 karakter',
          ],
        },
        {
          text: 'Username',
          value: 'username',
          type: 'text',
          required: true,
          rules: [
            (v) => !!v || 'Username harus diisi',
            (v) => v.length >= 5 || 'Username minimal 5 karakter',
          ],
        },
        {
          text: 'Password',
          value: 'password',
          type: 'text',
          required: true,
          rules: [
            (v) => !!v || 'Password harus diisi',
            (v) => v.length >= 8 || 'Password minimal 8 karakter',

          ],
        },
        { 
          text: 'Role',
          value: 'role',
          type: 'select',
          options:[],
          rules: [(v) => !!v || 'Rule harus dipilih']

         },
      ],
      meta: {},
      edit: {
        user: '',
        username: '',
        password: '',
        role: '',
      },
      isEditMode: false, // Tambahkan ini
      roleOptions: [],
    };
  },
  methods: {

    async updateRoleOptions() {
      this.roleOptions = await this.$fetchRole(); // Panggil fungsi fetchRole
      const roleField = this.formFields.find((field) => field.value === 'role');
      if (roleField) {
        roleField.options = this.roleOptions; // Atur options dengan roleOptions
      }
    },

    async fetchData(filter) {
      const token = this.$cookies.get(this.$config.tokenKey);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await api.get('/api/users', {
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
          nama: formData.user,
          username: formData.username,
          password: formData.password,
          idRole: formData.role,
          isDeleted: false,
        };
        console.log('Data Add', payload);

        let apiCall;
        if (isEdit) {
          apiCall = api.put(`/api/users/${this.edit.id}`, payload, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else {
          apiCall = api.post(`/api/users`, payload, {
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
          await api.delete(`/api/users/${data.id}`, {
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
        user:'',
        username: '',
        password: '',
        // role: '',
        // keterangan: '',
      };
      this.dialog = true;
      this.updateRoleOptions();
    },

    closeDialog() {
      this.dialog = false;
    },

    handleEditItem(item) {
      this.isEditMode = true; // Atur ke mode edit
      this.dialogTitle = 'Edit Data';
      this.edit = {
        id: item.id,
        user: item.user || '',
        username: item.username || '',
        password: item.password || '',
        id_role: item.role || '',
      };
      this.dialog = true;
      this.updateRoleOptions();

    },
  },
};
</script>
