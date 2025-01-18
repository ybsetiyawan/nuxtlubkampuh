const pool = require("../../config/db");
const { v4: uuidv4 } = require("uuid");

class MaterialRepository {
  async getAllMaterial() {
    const res = await pool.query("SELECT * FROM c_material where is_deleted = false");
    return res.rows;
  }

  async resolveAllMaterial({ pageSize, pageNumber, q, sortBy, sortType }) {
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
        FROM c_material
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
        FROM c_material
        WHERE is_deleted = false
        ${conditions.length > 0 ? " AND " + conditions.join(" AND ") : ""}
    `;
    const countResult = await pool.query(countQuery, values.slice(0, -2)); // Menghapus limit dan offset dari values
    const totalItems = parseInt(countResult.rows[0].count, 10);

    return { material: result.rows, totalItems };
  }

  async getMaterialById(id) {
    const res = await pool.query("SELECT * FROM c_material WHERE id = $1", [id]);
    return res.rows[0];
  }

  async createMaterial(material) {
    // Generate UUID
    const id = uuidv4();

    const res = await pool.query(
      "INSERT INTO c_material (id, kode, nama, created_by) VALUES ($1, $2, $3, $4) RETURNING *",
      [id, material.kode, material.nama, material.createdBy]
    );
    return res.rows[0];
  }

  async updateMaterial(id, material) {
    const res = await pool.query(
      "UPDATE c_material SET kode = $1, nama = $2,updated_by = $3, updated_at = now() WHERE id = $4 RETURNING *",
      [material.kode, material.nama, material.updatedBy, id]
    );
    return res.rows[0];
  }

  async deleteMaterial(id, updatedBy) {
    const res = await pool.query(
      "UPDATE c_material SET is_deleted = true,  updated_at = now(), updated_by = $2 WHERE id = $1  RETURNING *",
      [id, updatedBy]
    );
    return res.rows[0];
  }
}

module.exports = new MaterialRepository();
