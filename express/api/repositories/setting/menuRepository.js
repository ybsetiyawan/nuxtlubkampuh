const pool = require("../../config/db");
const { v4: uuidv4 } = require("uuid");

class MenuRepository {
  async resolveAllMenu({ pageSize, pageNumber, q, sortBy, sortType }) {
    const conditions = [];
    const values = [];

    // Kondisi pencarian jika ada
    if (q) {
      // Menambahkan kondisi untuk pencarian nama_menu dan link_menu
      conditions.push(
        `(nama_menu ILIKE $${values.length + 1} OR link_menu ILIKE $${
          values.length + 2
        })`
      );
      values.push(`%${q}%`, `%${q}%`); // Tambahkan kedua parameter ke values
    }

    let query = `
        SELECT id, nama_menu, link_menu, keterangan, class_icon, created_at, is_deleted 
        FROM menu
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
      query += " ORDER BY nama_menu"; // Default sorting
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
        FROM menu
        WHERE is_deleted = false
        ${conditions.length > 0 ? " AND " + conditions.join(" AND ") : ""}
    `;
    const countResult = await pool.query(countQuery, values.slice(0, -2)); // Menghapus limit dan offset dari values
    const totalItems = parseInt(countResult.rows[0].count, 10);

    return { users: result.rows, totalItems };
  }

  async getMenuAll() {
    const query = `
        SELECT * FROM menu where is_deleted= false
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  async getMenuById(id) {
    const res = await pool.query(
      `
        SELECT id, nama_menu, link_menu, keterangan, 
        class_icon, status, created_at, 
        updated_at, is_permission, 
        is_deleted
        FROM menu
        WHERE id = $1
    `,
      [id]
    );
    return res.rows[0];
  }

  async createMenu(menu) {
    // Generate UUID
    const id = uuidv4();

    const res = await pool.query(
      "INSERT INTO menu (id, nama_menu, link_menu, keterangan, class_icon, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        id,
        menu.namaMenu,
        menu.linkMenu,
        menu.keterangan,
        menu.classIcon,
        menu.status || "1",
      ]
    );
    return res.rows[0];
  }

  async updateMenu(id, menu) {
    const res = await pool.query(
      "UPDATE menu SET nama_menu = $1, link_menu = $2, keterangan =$3, class_icon=$4, is_deleted=$5, updated_at = NOW() WHERE id = $6 RETURNING *",
      [
        menu.namaMenu,
        menu.linkMenu,
        menu.keterangan,
        menu.classIcon,
        menu.isDeleted,
        id,
      ]
    );
    return res.rows[0];
  }

  async DeleteMenuStatus(id, data) {
    const { isDeleted } = data;
    const result = await pool.query(
      `
      UPDATE menu
      SET is_deleted = $1
      WHERE id = $2
      RETURNING *
      `,
      [isDeleted, id]
    );

    return result.rows[0];
  }
}

module.exports = new MenuRepository();
