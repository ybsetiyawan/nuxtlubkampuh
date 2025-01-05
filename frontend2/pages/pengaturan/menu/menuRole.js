import api from "~/service/api";


export default {

    data() {
        return {
          dialogTitle: 'Tambah Menu',
          formTitle: 'Tambah Menu User',
          valid: true,
          parent_selected: [],
          menu_selected: [],
          dialogMenuUser: false,
          listMenu: [],
          level: null,
          list_level: [
            { text: '1', value: 1 },
            { text: '2', value: 2 },
          ],
          posisi: null,
          list_posisi: [
            { text: 'sidebar', value: 1}
          ],
          listRole: [],
          role_selected: '',
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
            { 
              text: 'Level',
              value: 'level',
              type: 'select',
              rules: [(v) => !!v || 'Level harus dipilih'],
              options : [1,2]
            },
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

      created() { // Add this lifecycle hook
        this.fetchRole(); // Call fetchRole2 when the component is created
      },


      methods: {

        async fetchRole() {
          try {
          const response = await api.get('/api/roles');
          const roles = response.data.data;
          this.listRole = roles;
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

        getRoleName(roleId) {
          const role = this.listRole.find((role) => role.id === roleId);
          return role ? role.nama : 'Tidak Diketahui';
        },

        fn_menu_user_up(item) {
          console.log('Menu ke atas:', item);
          // Logika untuk memindahkan menu ke atas
        },
        fn_menu_user_down(item) {
          console.log('Menu ke bawah:', item);
          // Logika untuk memindahkan menu ke bawah
        },

        // remove(item) {
        //   const index = this.selectedItems.findIndex(selected => selected.id === item.id);
        //   if (index !== -1) {
        //   this.selectedItems.splice(index, 1);
        //   }
        //   if (!item || !item.id) {
        //     console.error('Item tidak valid:', item);
        //     return;
        //   }
        //   console.log('Menghapus item:', item);
        //   // Logik
        // },

        remove(item) {
          const index = this.menu_selected.indexOf(item.id)
          if (index >= 0) this.menu_selected.splice(index, 1)
        },
    
        async fetchData2(filter) {
          const token = this.$cookies.get(this.$config.tokenKey);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return await api.get('/api/menu-user/all', {
            headers: { Authorization: `Bearer ${token}` },
            params: filter,
          });
        },

        async fetchMenu(roleId) {
          const token = this.$cookies.get(this.$config.tokenKey);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          try {
            const response = await api.get(`/api/menu-user?roleId=${roleId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const menus = response.data.data;
            this.listMenu = menus;

            console.log('Role Selected:', this.role_selected);
            console.log('List Menus:', this.listMenu);

          } catch (error) {
            console.error('error load menu',error)
            this.listMenu =[];
          }
        },

        handleRoleChange(roleId) {
          console.log(this.role_selected);  // Menampilkan role yang dipilih di console
          this.role_selected = roleId;
          this.fetchMenu(roleId);
        },

        closeFormMenuUser() {
          // this.$refs.formAkses.reset()
          // this.$refs.formAkses.resetValidation()
          this.level = ""
          this.posisi = ""
          this.parent_selected = ""
          this.menu_selected = []
          this.dialogMenuUser = !this.dialogMenuUser
        },

        // saveMenuUserValidate() {
        //   if (this.$refs.formAkses.validate()) {
        //     this.saveMenuUser()
        //   }
        // },

        saveMenuUserValidate() {
          console.log('Saving menu user...');
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

        async deleteItem2(data) {
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
              await api.delete(`/api/menu-user/${data.id}`, {
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
    
        openAddDialog2() {
          this.isEditMode = false; // Atur ke mode tambah
          this.dialogTitleMenu = 'Tambah Menu Untuk Role';
          this.edit = {
            posisi: '',
            level: '',
          };
          this.fetchRole();
          this.fetchData();
          this.dialogMenu = true;
        },
    
        closeDialogMenu() {
          this.dialogMenu = false;
        },

        handleEditItem2(item) {
          this.isEditMode = true; // Atur ke mode edit
          this.dialogTitleMenu = 'Edit Menu Role';
          this.edit2 = {
            id: item.id,
            namaMenu: item.namaMenu || '',
            level: item.level || '',
            role: item.idRole
          };
          this.dialogMenu = true;
          this.fetchRole();
          this.fetchData();
    
    
        },
    
       
      },
}