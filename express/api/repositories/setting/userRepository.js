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
          values.length + 1
        })`
      );
      values.push(`%${q}%`);
    }

    let query = `
      SELECT u.id, u.nama AS user, u.username, u.id_role, 
             r.nama AS role, r.kode 
      FROM c_user u
      JOIN c_role r ON r.id = u.id_role
    `;

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
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
      ${conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : ""}
    `;
    const countResult = await pool.query(countQuery, values.slice(0, -2)); // Menghapus limit dan offset dari values
    const totalItems = parseInt(countResult.rows[0].count, 10);

    return { users: result.rows, totalItems };
  }

  async createUser(user) {
    // Generate UUID
    const id = uuidv4();

    const res = await pool.query(
      "INSERT INTO c_user (id, nama, username, password, id_role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id, user.nama, user.username, user.password, user.idRole]
    );
    return res.rows[0];
  }

  async getUserByUsername(username) {
    const res = await pool.query(
      "SELECT u.id, u.nama as user, u.username, u.password, u.id_role, r.nama as role, r.kode FROM c_user u JOIN c_role r on r.id=u.id_role WHERE username = $1",
      [username]
    );
    return res.rows[0];
  }
}

module.exports = new UserRepository();
