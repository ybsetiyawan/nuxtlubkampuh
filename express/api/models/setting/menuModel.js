const formatMenu = (menu) => ({
  id: menu.id,
  namaMenu: menu.nama_menu,
  linkMenu: menu.link_menu,
  keterangan: menu.keterangan,
  classIcon: menu.class_icon,
  status: menu.status,
  createdAt: menu.created_at,
  updatedAt: menu.updated_at,
  isPermission: menu.is_permission || false,
  isDeleted: menu.is_deleted || false,
});

module.exports = { formatMenu };
