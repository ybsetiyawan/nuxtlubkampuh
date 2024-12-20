const formatRoleAll = (role) => ({
  id: role.id,
  kode: role.kode,
  nama: role.nama,
  createdAt: role.created_at,
  createdBy: role.created_by,
  updatedAt: role.updated_at,
  updatedBy: role.updated_by,
  isDeleted: role.is_deleted || false,
});

module.exports = { formatRoleAll };
