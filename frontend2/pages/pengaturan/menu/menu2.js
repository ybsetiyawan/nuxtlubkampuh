import api from "~/service/api";


export default {

    data() {
        return {
          menuItems2: [],
          menuHeaders2: [
            { text: 'No', value: 'no', width: '68px', sortable: false },
            { text: 'Nama Menu', value: 'namaMenu', sortable: false },
            { text: 'Nama Parent', value: 'namaParent', sortable: false },
            { text: 'Link Menu', value: 'linkMenu', sortable: false },
            { text: 'Level', value: 'level', sortable: false },
            { text: 'Urutan', value: 'urutan', sortable: false },
            { text: 'Nama Role', value: 'namaRole', sortable: false },
          ],

          // dialog: false,
          dialogMenu: false,
          dialogTitleMenu: '',
          // loading: false,
          formFields2: [
            {
              text: 'Nama Menu',
              value: 'namaMenu',
              type: 'select',
              required: true,
              options:[],
              rules: [
                (v) => !!v || 'Menu harus dipilih',
              ],
            },
            { 
              text: 'Parent',
              value: 'parent',
              type: 'select',
              options:[],
    
            },
            { text: 'Level', value: 'level', type: 'text' },
            { 
              text: 'Role',
              value: 'role',
              type: 'select',
              options:[],
              rules: [(v) => !!v || 'Rule harus dipilih']
    
            },
          ],
          // meta: {},
          edit2: {
            posisi: '',
            level: '',
          },
          // isEditMode: false, // Tambahkan ini
        };
      },


      methods: {

        async fetchRole() {
          try {
          const response = await api.get('/api/roles');
          const roles = response.data.data;
          console.log('Role Data:', roles);
          const roleOptions = roles.map((role) => ({
            text: role.nama, // Ubah sesuai dengan nama field yang mewakili nama peran
            value: role.id,  // Ubah sesuai dengan id atau kode unik peran
          }));
          const roleField = this.formFields2.find((field) => field.value === 'role');
            if (roleField) {
            roleField.options = roleOptions;
          }
    
        } catch (error) {
          console.error('Gagal mengambil data role:', error);
          }
        },
    
        async fetchData2(filter) {
          const token = this.$cookies.get(this.$config.tokenKey);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return await api.get('/api/menu-user/all', {
            headers: { Authorization: `Bearer ${token}` },
            params: filter,
          });
        },

        async save2(formData2) {
      
          if (!this.$refs.form2.validate()) {
            this.$toast.fire({
              icon: 'error',
              title: 'Form tidak valid, silahkan isi data dengan benar!',
            });
            return
          }
          this.loading = true;
          try {
          const token = this.$cookies.get(this.$config.tokenKey);
          const isEdit = !!this.edit2.id;
    
          const payload = {
            idMenu: formData2.namaMenu,
            parent: formData2.parent,
            posisi: '1',
            level: formData2.level,
            idRole: formData2.role,
            isDeleted: false,
          };
          console.log('data send menu-user',payload)
          const apiCall = isEdit
            ? api.put(`/api/menu-user/${this.edit2.id}`, payload, {
                headers: { Authorization: `Bearer ${token}` },
              })
            : api.post(`/api/menu-user`, payload, {
              headers: { Authorization: `Bearer ${token}` },
            });
    
          await apiCall;
          this.closeDialogMenu();
          if (this.$refs.dataTable) {
            await this.$refs.dataTable.loadData();
          }
          this.$toast.fire({
            icon: 'success',
            title: isEdit
              ? 'Data berhasil diperbarui'
              : 'Data berhasil ditambahkan',
          });
          // window.location.reload();
          } catch (error) {
            console.error('Error Save data:', error);
            this.$toast.fire({
              icon: 'error',
              title:
                error.response?.data?.message || 'Gagal menyimpan data',
            });
          } finally {
            this.loading = false;
          }
        },
    
        openAddDialog2() {
          this.isEditMode = false; // Atur ke mode tambah
          this.dialogTitle = 'Tambah Data';
          this.edit2 = {
            namaMenu: '',
            level: '',
          };
          this.dialogMenu = true;
          this.fetchRole();
          this.fetchData();
        },
    
        closeDialogMenu() {
          this.dialogMenu = false;
        },

        handleEditItem2(item) {
          this.isEditMode = true; // Atur ke mode edit
          this.dialogTitleMenu = 'Edit Menu User';
          this.edit2 = {
            id: item.id,
            idMenu: item.namaMenu || '',
            level: item.level || '',
          };
          this.dialogMenu = true;
          this.fetchRole();
          this.fetchData();
    
    
        },
    
       
      },
}