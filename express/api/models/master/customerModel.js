const formatCustomer = (customer) => ({
  id: customer.id,
  kode: customer.kode,
  nama: customer.nama,
  noTelp: customer.no_telp,
  alamat: customer.alamat,
  email: customer.email,
  npwp: customer.npwp,
  createdAt: customer.created_at,
  updatedAt: customer.updated_at,
  isDeleted: customer.is_deleted || false,
});

module.exports = { formatCustomer };
