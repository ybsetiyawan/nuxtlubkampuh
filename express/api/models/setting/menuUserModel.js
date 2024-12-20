const formatMenuUser = (menuUser) => ({
  id: menuUser.id,
  idMenu: menuUser.id_menu,
  posisi: menuUser.posisi,
  level: menuUser.level,
  urutan: menuUser.urutan,
  status: menuUser.status,
  createdAt: menuUser.created_at,
  updatedAt: menuUser.updated_at,
  parent: menuUser.parent,
  idRole: menuUser.id_role,
  isDeleted: menuUser.is_deleted || false,
});

module.exports = { formatMenuUser };
