const pool = require("../../config/db");
const { v4: uuidv4 } = require("uuid");

class DeliveryRepositories {
  async getAllDelivery() {
    const res = await pool.query("SELECT * FROM t_delivery where is_deleted = false");
    return res.rows;
  }

  async resolveAllDelivery({ pageSize, pageNumber, q, sortBy, sortType }) {
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
        SELECT id, doc_no, tanggal_kirim, id_customer, created_at, is_deleted 
        FROM t_delivery
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
      query += " ORDER BY doc_no"; // Default sorting
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
        FROM t_delivery
        WHERE is_deleted = false
        ${conditions.length > 0 ? " AND " + conditions.join(" AND ") : ""}
    `;
    const countResult = await pool.query(countQuery, values.slice(0, -2)); // Menghapus limit dan offset dari values
    const totalItems = parseInt(countResult.rows[0].count, 10);

    return { users: result.rows, totalItems };
  }

  async getDeliveryId(id) {
    const res = await pool.query("SELECT * FROM t_delivery WHERE id = $1", [id]);
    return res.rows[0];
  }

  async createDeliveryWithDetails(delivery, details) {
    const id = uuidv4(); // Membuat UUID baru untuk pengiriman
  
    const client = await pool.connect(); // Mulai transaksi
    try {
      await client.query("BEGIN");
  
      // 1. Insert data ke tabel t_delivery
      const insertDeliveryQuery = `
        INSERT INTO t_delivery (id, doc_no, tanggal_kirim, id_customer, keterangan, is_status, created_by)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;
      const deliveryValues = [
        id, // Menggunakan UUID yang baru dibuat
        delivery.docNo,
        delivery.tanggalKirim,
        delivery.idCustomer,
        delivery.keterangan,
        delivery.isStatus,
        delivery.createdBy,
      ];
      const deliveryResult = await client.query(insertDeliveryQuery, deliveryValues);
      const newDelivery = deliveryResult.rows[0];
  
      // 2. Insert data ke tabel t_delivery_detail
      const insertDetailQuery = `
        INSERT INTO t_delivery_detail (id, id_delivery, id_material, qty)
        VALUES ($1, $2, $3, $4)
      `;
      for (const detail of details) {
        const detailId = uuidv4(); // Buat UUID untuk detail
        const detailValues = [detailId, newDelivery.id, detail.idMaterial, detail.qty]; // Gunakan UUID yang sama untuk id_delivery
        await client.query(insertDetailQuery, detailValues);
      }
  
      // Commit transaksi
      await client.query("COMMIT");
  
      return {
        delivery: newDelivery,
        details,
      };
    } catch (error) {
      await client.query("ROLLBACK"); // Rollback transaksi jika terjadi error
      console.error("Error during transaction:", error);
      throw error;
    } finally {
      client.release(); // Akhiri koneksi
    }
  }
  

  // async updateDelivery(id, delivery) {
  //   const res = await pool.query(
  //     "UPDATE t_delivery SET doc_no = $1, tanggal_kirim = $2, updated_by = $3, updated_at = now() WHERE id = $4 RETURNING *",
  //     [delivery.kode, delivery.nama, delivery.updatedBy, id]
  //   );
  //   return res.rows[0];
  // }

  async updateDelivery(id, delivery) {
    const query = `
      UPDATE t_delivery 
      SET doc_no = $1, 
          tanggal_kirim = $2, 
          id_customer = $3, 
          keterangan = $4, 
          is_status = $5, 
          updated_by = $6, 
          updated_at = now()
      WHERE id = $7 
      RETURNING *
    `;
    const values = [
      delivery.docNo,
      delivery.tanggalKirim,
      delivery.idCustomer,
      delivery.keterangan,
      delivery.isStatus,
      delivery.updatedBy,
      id,
    ];
    const res = await pool.query(query, values);
    return res.rows[0];
  }
  

  async deleteDelivery(id, updatedBy) {
    const res = await pool.query(
      "UPDATE t_delivery SET is_deleted = true,  updated_at = now(), updated_by = $2 WHERE id = $1  RETURNING *",
      [id, updatedBy]
    );
    return res.rows[0];
  }
}

module.exports = new DeliveryRepositories();
