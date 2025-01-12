class Users {
  constructor(id, nama, username, password, id_role, id_customer) {
    
    this.id = id;
    this.username = username;
    this.nama = nama;
    this.password = password;
    this.id_role = id_role;
    this.id_customer = this.id_customer;
  }
}

module.exports = Users;

// const formatUser = (user) => ({
//   id: user.id,
//   nama: user.nama,
//   username: user.username,
//   password: user.password,
//   idRole: user.id_role,
//   aktif: user.aktif,
//   createdAt: user.created_at,
//   createdBy: user.created_by,
//   updatedAt: user.updated_at,
//   updatedBy: user.updated_by,
//   isDeleted: user.is_deleted || false,
// });

// module.exports = { formatUser };

