const pool = require("../../config/db");
const { v4: uuidv4 } = require("uuid");

class UserRepository {
  async resolveAllUsers({ pageSize, pageNumber, idRole, q, sortBy, sortType }) {
    const conditions = [];
    const values = [];

    // Menambah kondisi untuk filter
    if (idRole) {
      conditions.push(`u.id_role = $${values.length + 1}`);
      values.push(idRole);
    }

    if (q) {
      conditions.push(
        `(u.username ILIKE $${values.length + 1} OR u.nama ILIKE $${
          values.length + 2
        })`
      );
      values.push(`%${q}%`, `%${q}%`);
    }

    let query = `
      SELECT u.id, u.nama AS user, u.username, u.id_role, u.is_deleted, u.id_customer,
             r.nama AS role, r.kode ,c.kode AS kode_customer
      FROM c_user u
      JOIN c_role r ON r.id = u.id_role
      LEFT JOIN m_customer c ON c.id = u.id_customer
      WHERE u.is_deleted = false
    `;

    if (conditions.length > 0) {
      query += " AND " + conditions.join(" AND ");
    }

    if (sortBy && sortType) {
      query += ` ORDER BY ${sortBy} ${sortType}`;
    } else {
      query += " ORDER BY u.id";
    }

    const offset = (pageNumber - 1) * pageSize;
    query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(pageSize, offset);

    // Eksekusi query untuk mendapatkan data
    const result = await pool.query(query, values);

    // Dapatkan total item
    const countQuery = `
      SELECT COUNT(*) 
      FROM c_user u
      JOIN c_role r ON r.id = u.id_role
      ${conditions.length > 0 ? "AND " + conditions.join(" AND ") : ""}
    `;
    const countResult = await pool.query(countQuery, values.slice(0, -2)); // Menghapus limit dan offset dari values
    const totalItems = parseInt(countResult.rows[0].count, 10);

    return { users: result.rows, totalItems };
  }

  async createUser(user) {
    // Generate UUID
    // console.log('Data From BE :', user)
    const id = uuidv4();

    const res = await pool.query(
      "INSERT INTO c_user (id, nama, username, password, id_role, id_customer) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [id, user.nama, user.username, user.password, user.idRole, user.idCustomer]
    );
    return res.rows[0];
  }

  async updateUser(id, user) {
    const res = await pool.query(
      "UPDATE c_user SET nama = $1, username = $2, password =$3, id_role=$4, id_customer=$5, is_deleted=$6, updated_at = NOW() WHERE id = $7 RETURNING *",
      [user.nama, user.username, user.password, user.idRole, user.idCustomer, user.isDeleted, id]
    );
    return res.rows[0];
  }

  async DeleteUserStatus(id, data) {
    const { isDeleted } = data;
    const result = await pool.query(
      `
      UPDATE c_user
      SET is_deleted = $1
      WHERE id = $2
      RETURNING *
      `,
      [isDeleted, id]
    );

    return result.rows[0];
  }
  // username
  async getUserByUsername(username) {
    const res = await pool.query(
      `SELECT u.id, u.nama as user, u.username, u.password, u.id_role, r.nama as role, r.kode,
      c.id as id_customer, c.kode kode_customer, c.nama customer, c.alamat, c.no_telp, c.email, c.npwp
      FROM c_user u 
      JOIN c_role r on r.id=u.id_role 
      LEFT JOIN public.m_customer c on c.id=u.id_customer
      WHERE username = $1 AND u.is_deleted = false `,
      [username]
    );
    return res.rows[0];
  }

  async updatePassword(id, hashedPassword) {
    const result = await pool.query(
      `UPDATE c_user SET password = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [hashedPassword, id]
    );
    return result.rows[0];
  }

  
  

  
}

module.exports = new UserRepository();
