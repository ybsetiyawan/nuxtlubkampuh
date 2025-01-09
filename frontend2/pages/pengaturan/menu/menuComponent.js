export default {
    data() {
        return {
            // MENU
            tab: 0,
            tabs: ['Menu', 'HAK AKSES'],
            list_menu: [],
            items: [],
            menuItems: [],
            menuHeaders: [
                { text: 'No', value: 'no', width: '68px', sortable: false },
                { text: 'Nama Menu', value: 'namaMenu', sortable: false },
                { text: 'Link Menu', value: 'linkMenu', sortable: false },
                { text: 'Class Icon', value: 'classIcon', sortable: false },
                { text: 'Keterangan', value: 'keterangan', sortable: false },
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
            isEditMode: false,

            // HAK AKSES
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
        }
    }
}