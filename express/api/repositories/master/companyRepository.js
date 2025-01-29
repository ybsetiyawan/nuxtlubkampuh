const pool = require("../../config/db");
const { v4: uuidv4 } = require("uuid");

class CompanyRepository {
  async resolveAllCompany({ pageSize, pageNumber, q, sortBy, sortType }) {
    const conditions = [];
    const values = [];

    // Kondisi pencarian jika ada
    if (q) {
      // Menambahkan kondisi untuk pencarian nama_menu dan link_menu
      conditions.push(
        `(nama ILIKE $${values.length + 1} OR alamat ILIKE $${values.length + 2})`
      );
      values.push(`%${q}%`, `%${q}%`); // Tambahkan kedua parameter ke values
    }

    let query = `
        SELECT id, nama, alamat, no_telp, email, npwp, bank, bank_no, bank_an, created_at, created_by, updated_at, updated_by, is_deleted
        FROM public.m_company
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
      query += " ORDER BY nama"; // Default sorting
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
        FROM m_company
        WHERE is_deleted = false
        ${conditions.length > 0 ? " AND " + conditions.join(" AND ") : ""}
    `;
    const countResult = await pool.query(countQuery, values.slice(0, -2)); // Menghapus limit dan offset dari values
    const totalItems = parseInt(countResult.rows[0].count, 10);

    return { company: result.rows, totalItems };
  }

  async getCompanyAll() {
    const query = `
        SELECT * FROM m_company where is_deleted= false
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  async getCompanyById(id) {
    const res = await pool.query(
      `
      SELECT id, nama, alamat, no_telp, email, npwp, bank, bank_no, bank_an, created_at, created_by, updated_at, updated_by, is_deleted
      FROM public.m_company
      WHERE id = $1
    `,
      [id]
    );
    return res.rows[0];
  }

  async createCompany(company) {
    // Generate UUID
    const id = uuidv4();

    const res = await pool.query(
      `INSERT INTO m_company (id, nama, alamat, no_telp, email, npwp, bank, bank_no, bank_an)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`,
      [
        id,
        company.nama,
        company.alamat,
        company.noTelp,
        company.email,
        company.npwp,
        company.bank,
        company.bankNo,
        company.bankAn,
      ]
    );
    return res.rows[0];
  }
  async updateCompany(id, company) {
    const res = await pool.query(
      `UPDATE m_company
        SET nama = $1, alamat = $2, no_telp = $3, email = $4, npwp = $5, bank = $6, bank_no = $7, bank_an = $8, updated_at = NOW()
        WHERE id = $9 RETURNING *`,
      [
        company.nama,
        company.alamat,
        company.noTelp,
        company.email,
        company.bank,
        company.bankNo,
        company.bankAn,
        id,
      ]
    );
    return res.rows[0];
  }

  async deleteCompany(id, data) {
    const { isDeleted } = data;
    const result = await pool.query(
      `
      UPDATE m_company
      SET is_deleted = $1
      WHERE id = $2
      RETURNING *
      `,
      [isDeleted, id]
    );

    return result.rows[0];
  }
}

module.exports = new CompanyRepository();
