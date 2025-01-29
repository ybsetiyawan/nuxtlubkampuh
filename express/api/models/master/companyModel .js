const formatCompany = (company) => ({
  id: company.id,
  nama: company.nama,
  alamat: company.alamat,
  noTelp: company.no_telp,
  email: company.email,
  npwp: company.npwp,
  bank: company.bank,
  bankNo: company.bank_no,
  bankAn: company.bank_an,
  createdAt: company.created_at,
  createdBy: company.created_by,
  updatedAt: company.updated_at,
  updatedBy: company.updated_by,
  isDeleted: company.is_deleted || false,
});

module.exports = { formatCompany };
