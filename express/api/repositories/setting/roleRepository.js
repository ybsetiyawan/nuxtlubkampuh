const pool = require("../../config/db");
const { v4: uuidv4 } = require("uuid");

class RolesRepository {
  async getAllRoles() {
    const res = await pool.query("SELECT * FROM c_role");
    return res.rows;
  }

  async resolveAllRoles({ pageSize, pageNumber, q, sortBy, sortType }) {
    const conditions = [];
    const values = [];

    // Kondisi pencarian jika ada
    if (q) {
      // Menambahkan kondisi untuk pencarian nama_menu dan link_menu
      conditions.push(
        `(kode ILIKE $${values.length + 1} OR nama ILIKE $${
          values.length + 2
        })`
      );
      values.push(`%${q}%`, `%${q}%`); // Tambahkan kedua parameter ke values
    }

    let query = `
        SELECT id, kode, nama, created_at, is_deleted 
        FROM c_role
        WHERE is_deleted = false
    `;

    

    // Menambahkan kondisi pencarian jika ada
    if (conditions.length > 0) {
      query += " AND " + conditions.join(" AND ");
    }

    // Menambahkan sorting jika ada
    if (sortBy && sortType) {
      query += ` ORDER BY ${sortBy} ${sortType}`;
    } else {
      query += " ORDER BY kode"; // Default sorting
    }

    // Mengatur limit dan offset untuk pagination
    const offset = (pageNumber - 1) * pageSize;
    query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(pageSize, offset);

    // Eksekusi query untuk mendapatkan data
    const result = await pool.query(query, values);

    // Dapatkan total item tanpa limit dan offset
    const countQuery = `
        SELECT COUNT(*) 
        FROM c_role
        WHERE is_deleted = false
        ${conditions.length > 0 ? " AND " + conditions.join(" AND ") : ""}
    `;
    const countResult = await pool.query(countQuery, values.slice(0, -2)); // Menghapus limit dan offset dari values
    const totalItems = parseInt(countResult.rows[0].count, 10);

    return { users: result.rows, totalItems };
  }

  async getRolesById(id) {
    const res = await pool.query("SELECT * FROM c_role WHERE id = $1", [id]);
    return res.rows[0];
  }

  async createRoles(role) {
    // Generate UUID
    const id = uuidv4();

    const res = await pool.query(
      "INSERT INTO c_role (id, kode, nama) VALUES ($1, $2, $3) RETURNING *",
      [id, role.kode, role.nama]
    );
    return res.rows[0];
  }

  async updateRoles(id, role) {
    const res = await pool.query(
      "UPDATE c_role SET kode = $1, nama = $2, updated_at = now() WHERE id = $3 RETURNING *",
      [role.kode, role.nama, id]
    );
    return res.rows[0];
  }

  async deleteRoles(id) {
    const res = await pool.query(
      "UPDATE c_role SET is_deleted = true,  updated_at = now() WHERE id = $1  RETURNING *",
      [id]
    );
    return res.rows[0];
  }
}

module.exports = new RolesRepository();
