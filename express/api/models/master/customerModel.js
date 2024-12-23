const formatCustomer = (customer) => ({
  id: customer.id,
  kode: customer.kode,
  nama: customer.nama,
  noTelp: customer.no_telp,
  alamat: customer.alamat,
  email: customer.email,
  npwp: customer.npwp,
  createdAt: customer.created_at,
  createdBy: customer.created_by,
  updatedAt: customer.updated_at,
  updatedBy: customer.updated_by,
  isDeleted: customer.is_deleted || false,
});

module.exports = { formatCustomer };
