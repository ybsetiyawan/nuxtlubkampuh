import api from "~/service/api";


export default {

    data() {
        return {
          items: [],
          tab: 2,
          tabs: ['Menu', 'HAK AKSES','HAK AKSES NEW'],
          menuItems: [],
          menuHeaders: [
            { text: 'No', value: 'no', width: '68px', sortable: false },
            { text: 'Nama Menu', value: 'namaMenu', sortable: false },
            { text: 'Link Menu', value: 'linkMenu', sortable: false },
            { text: 'Class Icon', value: 'classIcon', sortable: false },
            { text: 'Keterangan', value: 'keterangan', sortable: false },
          ],
    
          menuHeaders2: [
            { text: 'No', value: 'no', width: '68px', sortable: false },
            { text: 'Nama Menu', value: 'namaMenu', sortable: false },
            { text: 'Nama Parent', value: 'namaParent', sortable: false },
            { text: 'Link Menu', value: 'linkMenu', sortable: false },
            { text: 'Urutan', value: 'urutan', sortable: false },
            { text: 'Level', value: 'level', sortable: false },
            { text: 'Nama Role', value: 'namaRole', sortable: false },
          ],
    
          dialog: false,
          dialogTitle: '',
          loading: false,
          formFields: [
            {
              text: 'Nama Menu',
              value: 'namaMenu',
              type: 'text',
              required: true,
              rules: [
                (v) => !!v || 'Nama menu harus diisi',
                (v) => v.length >= 3 || 'Nama menu minimal 3 karakter',
              ],
            },
            {
              text: 'Link Menu',
              value: 'linkMenu',
              type: 'text',
              required: true,
              rules: [],
            },
            { text: 'Class Icon', value: 'classIcon', type: 'text' },
            { text: 'Keterangan', value: 'keterangan', type: 'text' },
          ],
          meta: {},
          edit: {
            namaMenu: '',
            linkMenu: '',
            classIcon: '',
            keterangan: '',
          },
          isEditMode: false, // Tambahkan ini
        };
      },
      methods: {
        
        async fetchData(filter) {
          const token = this.$cookies.get(this.$config.tokenKey);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          try {
            const response = await api.get('/api/menu', {
              headers: { Authorization: `Bearer ${token}` },
              params: filter,
            });
            const menus = response.data.data.items;
            // console.log('Menu Data:', menus);
            const parentOptions = menus.map((p) => ({
            text: p.namaMenu, // Ubah sesuai dengan nama field yang mewakili nama peran
            value: p.id,  // Ubah sesuai dengan id atau kode unik peran
          }));
          const parentField = this.formFields2.find((field) => field.value === 'parent');
            if (parentField) {
            parentField.options = parentOptions;
          }
    
          const menuField = this.formFields2.find((field) => field.value === 'namaMenu');
            if (parentField) {
            menuField.options = parentOptions;
          }
          return response
    
          } catch (error) {
            console.error('Gagal ambil data menu:', error);
          }
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
      },
}