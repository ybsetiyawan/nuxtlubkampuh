const formatMaterialAll = (material) => ({
  id: material.id,
  kode: material.kode,
  nama: material.nama,
  createdAt: material.created_at,
  createdBy: material.created_by,
  updatedAt: material.updated_at,
  updatedBy: material.updated_by,
  isDeleted: material.is_deleted || false,
});

module.exports = { formatMaterialAll };
