const pool = require("../../config/db");
const { v4: uuidv4 } = require("uuid");

class CustomerRepository {
  async resolveAllCustomer({ pageSize, pageNumber, q, sortBy, sortType }) {
    const conditions = [];
    const values = [];

    // Kondisi pencarian jika ada
    if (q) {
      // Menambahkan kondisi untuk pencarian nama_menu dan link_menu
      conditions.push(
        `(nama ILIKE $${values.length + 1} OR kode ILIKE $${values.length + 2})`
      );
      values.push(`%${q}%`, `%${q}%`); // Tambahkan kedua parameter ke values
    }

    let query = `
        SELECT id, kode, nama, no_telp, alamat, email, npwp, created_at, created_by, updated_at, updated_by, is_deleted
        FROM public.m_customer
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
        FROM m_customer
        WHERE is_deleted = false
        ${conditions.length > 0 ? " AND " + conditions.join(" AND ") : ""}
    `;
    const countResult = await pool.query(countQuery, values.slice(0, -2)); // Menghapus limit dan offset dari values
    const totalItems = parseInt(countResult.rows[0].count, 10);

    return { customer: result.rows, totalItems };
  }

  async getCustomerAll() {
    const query = `
        SELECT * FROM m_customer where is_deleted= false
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  async getCustomerById(id) {
    const res = await pool.query(
      `
      SELECT id, kode, nama, no_telp, alamat, email, npwp, created_at, created_by, updated_at, updated_by, is_deleted
      FROM public.m_customer
      WHERE id = $1
    `,
      [id]
    );
    return res.rows[0];
  }

    
    
  
  
  async createCustomer(customer) {
    const generateKode = async () => {
      const result = await pool.query('SELECT kode FROM m_customer ORDER BY kode DESC LIMIT 1');
      let kodeTerakhir = result.rows[0]?.kode;
      
      if (!kodeTerakhir) {
        kodeTerakhir = 'A01';
      } else {
        const angka = parseInt(kodeTerakhir.substring(1));
        kodeTerakhir = `A${String(angka + 1).padStart(2, '0')}`;
      }
      
      return kodeTerakhir;
    };
    
    

    // Generate UUID
    const id = uuidv4();
    const kode = await generateKode();
    const res = await pool.query(
      "INSERT INTO m_customer (id, kode, nama, no_telp, alamat, email, npwp) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        id,
        kode,
        customer.nama,
        customer.noTelp,
        customer.alamat,
        customer.email,
        customer.npwp,
      ]
    );
    return res.rows[0];
  }

  async updateCustomer(id, customer) {
    const res = await pool.query(
      "UPDATE m_customer SET kode = $1, nama = $2, no_telp =$3, alamat=$4, email=$5, npwp=$6, is_deleted=$7, updated_at = NOW() WHERE id = $8 RETURNING *",
      [
        customer.kode,
        customer.nama,
        customer.noTelp,
        customer.alamat,
        customer.email,
        customer.npwp,
        customer.isDeleted,
        id,
      ]
    );
    return res.rows[0];
  }

  async DeleteCustomerStatus(id, data) {
    const { isDeleted } = data;
    const result = await pool.query(
      `
      UPDATE m_customer
      SET is_deleted = $1
      WHERE id = $2
      RETURNING *
      `,
      [isDeleted, id]
    );

    return result.rows[0];
  }
}

module.exports = new CustomerRepository();
