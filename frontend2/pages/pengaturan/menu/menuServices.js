import api from "~/service/api";


export default {
    created() {
        this.fetchData();
        this.fetchRole();
    },

    methods: {
        // TAB MENU
        async fetchData(filter) {
            const token = this.$cookies.get(this.$config.tokenKey);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            try {
              const response = await api.get('/api/menu', {
                headers: { Authorization: `Bearer ${token}` },
                params: filter,
              });
              const menus = response.data.data.items;
              this.list_menu = menus;
              return response
    
            } catch (error) {
              console.error('Gagal ambil data menu:', error);
            }
          },

          transformResponse(response) {
            return {
              items: response.data.data.items,
              meta: response.data.data.meta,
            };
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
            const isEdit = !!this.edit.id;
      
            const payload = {
              namaMenu: formData.namaMenu,
              linkMenu: formData.linkMenu || '#',
              keterangan: formData.keterangan || null,
              classIcon: formData.classIcon || null,
              isDeleted: false,
            };
            const apiCall = isEdit
              ? api.put(`/api/menu/${this.edit.id}`, payload, {
                  headers: { Authorization: `Bearer ${token}` },
                })
              : api.post(`/api/menu`, payload, {
                headers: { Authorization: `Bearer ${token}` },
              });
      
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
                  error.response?.data?.message || 'Gagal menyimpan data',
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
                await api.delete(`/api/menu/${data.id}`, {
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

          openAddDialog() {
            this.isEditMode = false; // Atur ke mode tambah
            this.dialogTitle = 'Tambah Data';
            this.edit = {
              namaMenu: '',
              linkMenu: '',
              classIcon: '',
              keterangan: '',
            };
            this.dialog = true;
          },
      
          closeDialog() {
            this.dialog = false;
          },
      
          handleEditItem(item) {
            this.isEditMode = true; // Atur ke mode edit
            this.dialogTitle = 'Edit Menu';
            this.edit = {
              id: item.id,
              namaMenu: item.namaMenu || '',
              linkMenu: item.linkMenu || '',
              classIcon: item.classIcon || '',
              keterangan: item.keterangan || '',
            };
            this.dialog = true;
          },

        //   TAB HAK AKSES
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
      
            }catch (error) {
            console.error('Gagal mengambil data role:', error);
            }
          },

          async updateRoleOptions() {
            this.roleOptions = await this.$fetchRole(); // Panggil fungsi fetchRole
            const roleField = this.formFields.find((field) => field.value === 'role');
            if (roleField) {
              roleField.options = this.roleOptions; // Atur options dengan roleOptions
            }
          },

          handleRoleChange(roleId) {
            console.log(this.role_selected);  // Menampilkan role yang dipilih di console
            this.role_selected = roleId;
            this.fetchMenu(roleId);
          },

          getRoleName(roleId) {
            const role = this.listRole.find((role) => role.id === roleId);
            return role ? role.nama : 'Tidak Diketahui';
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

          fn_menu_user_up(item) {
            console.log('Menu ke atas:', item);
            // Logika untuk memindahkan menu ke atas
          },
          fn_menu_user_down(item) {
            console.log('Menu ke bawah:', item);
            // Logika untuk memindahkan menu ke bawah
          },
  
          remove(item) {
            const index = this.menu_selected.indexOf(item.id)
            if (index >= 0) this.menu_selected.splice(index, 1)
          },

          async saveMenuUserValidate() {

            if (!this.level || !this.posisi || this.menu_selected.length === 0) {
              this.$toast.fire({
                icon: 'warning',
                title: 'Lengkapi semua data.',
              });
              return; // Hentikan proses jika data tidak lengkap
            }
            try {
              const token = this.$cookies.get(this.$config.tokenKey);
          
              // Buat payload
              const payload = {
                idRole: this.role_selected,
                level: this.level,
                posisi: this.posisi,
                parent: this.parent_selected || null, // Jika tidak dipilih, kirim null
                idMenu: Array.isArray(this.menu_selected) ? this.menu_selected : [], // Pastikan selalu array
                isDeleted: false,
              };
          
              console.log("Payload Baru:", payload); // Debugging payload
          
              // Kirim data ke API
              await api.post(`/api/menu-user`, payload, {
                headers: { Authorization: `Bearer ${token}` },
              });
              this.$root.$emit("start-loading"); // Mulai loading
              await new Promise((resolve) => setTimeout(resolve, 1000)); // Tambahkan penundaan 1 detik
              // Tampilkan notifikasi berhasil
              this.$toast.fire({
                icon: 'success',
                title: 'Data berhasil ditambahkan.',
              });
          
              this.closeFormMenuUser(); // Tutup form jika berhasil
            } catch (error) {
              console.error("Error menyimpan menu:", error);
              // Tampilkan pesan kesalahan
              this.$toast.fire({
                icon: 'error',
                title: error.response?.data?.message || 'Gagal menyimpan data.',
              });
            } finally {
            this.$root.$emit("stop-loading"); // Selesai loading
            }
          },
  
          async deleteMenuUser(item) {
  
            try {
              const result = await this.$showConfirmationDialog();
              if (result.isConfirmed) {
                const token = this.$cookies.get(this.$config.tokenKey);
                await api.delete(`/api/menu-user/${item.id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
    
                this.$root.$emit("start-loading"); // Mulai loading
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Tambahkan penundaan 1 detik
                this.$toast.fire({
                  icon: 'success',
                  title: 'Data berhasil dihapus',
                });
                
                this.items = this.items.filter((menu) => menu.id !== item.id);
              }
              } catch (error) {
              this.$toast.fire({
              icon: 'error',
              title: error.response?.data?.message || 'Gagal menghapus data',
                });
              } finally {
              this.$root.$emit("stop-loading"); // Selesai loading
              }
  
          },

          closeFormMenuUser() {
            // Reset semua data di form
            this.level = null;
            this.posisi = null;
            this.parent_selected = null;
            this.menu_selected = [];
            this.dialogMenuUser = !this.dialogMenuUser
          },

    }
}