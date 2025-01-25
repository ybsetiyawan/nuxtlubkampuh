const pool = require("../../config/db");
const { v4: uuidv4 } = require("uuid");

class DeliveryRepositories {
  async getAllDelivery() {
    // const res = await pool.query("SELECT * FROM t_delivery where is_deleted = false");
    // return res.rows;

    const res = await pool.query(`
      SELECT 
      d.id,
      d.doc_no,
      d.tanggal_kirim,
      d.id_customer,
      c.nama AS nama_customer,
      d.keterangan,
      d.is_status,
      d.created_by,
      d.created_at,
      d.updated_by,
      d.updated_at,
      json_agg(
        json_build_object(
          'id_detail', dd.id,
          'id_material', dd.id_material,
          'kode_material', m.kode,
          'nama_material', m.nama,
          'qty', dd.qty
        )
      ) AS details
    FROM t_delivery d
    LEFT JOIN t_delivery_detail dd ON d.id = dd.id_delivery
    LEFT JOIN c_material m ON dd.id_material = m.id
    LEFT JOIN m_customer c ON d.id_customer = c.id
    GROUP BY d.id, c.nama
    ORDER BY 
    d.created_at DESC;`)
  
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
    const res = await pool.query(`
      SELECT 
        d.id,
        d.doc_no,
        d.tanggal_kirim,
        d.id_customer,
        c.nama AS nama_customer,  -- Menambahkan nama customer
        d.keterangan,
        d.is_status,
        d.created_by,
        d.created_at,
        d.updated_by,
        d.updated_at,
        json_agg(
          json_build_object(
            'id_detail', dd.id,
            'id_material', dd.id_material,
            'kode_material', m.kode,
            'nama_material', m.nama,
            'qty', dd.qty
          )
        ) AS details
      FROM t_delivery d
      LEFT JOIN t_delivery_detail dd ON d.id = dd.id_delivery
      LEFT JOIN c_material m ON dd.id_material = m.id
      LEFT JOIN m_customer c ON d.id_customer = c.id  -- Menambahkan join ke c_customer
      WHERE d.id = $1 AND is_status = '1'
      GROUP BY d.id, c.nama
    `, [id]);
  
    return res.rows[0];
  }

  async getDeliveryByIdCustomer(id_customer) {
    const res = await pool.query(`
      SELECT 
        d.id,
        d.doc_no,
        d.tanggal_kirim,
        d.id_customer,
        c.nama AS nama_customer,  -- Menambahkan nama customer
        d.keterangan,
        d.is_status,
        d.created_by,
        d.created_at,
        d.updated_by,
        d.updated_at,
        d.is_deleted,
        json_agg(
          json_build_object(
            'id_detail', dd.id,
            'id_material', dd.id_material,
            'kode_material', m.kode,
            'nama_material', m.nama,
            'qty', dd.qty
          )
        ) AS details
      FROM t_delivery d
      LEFT JOIN t_delivery_detail dd ON d.id = dd.id_delivery
      LEFT JOIN c_material m ON dd.id_material = m.id
      LEFT JOIN m_customer c ON d.id_customer = c.id  -- Menambahkan join ke c_customer
      WHERE d.id_customer = $1 AND d.is_deleted = 'FALSE' 
      GROUP BY d.id, c.nama  -- Pastikan menambahkan c.nama ke GROUP BY
    `, [id_customer]);
  
    return res.rows;
  }
  

  
  

  async createDeliveryWithDetails(delivery, details) {
    const id = uuidv4(); // Membuat UUID baru untuk pengiriman
    if (!delivery.idCustomer) {
      throw new Error("Anda tidak terdaftar sebagai customer");
    }
  
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
    // Mulai transaksi
    const client = await pool.connect();
    try {
      await client.query('BEGIN'); // Memulai transaksi
  
      // Query untuk memperbarui t_delivery
      const queryDelivery = `
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
      const valuesDelivery = [
        delivery.docNo,
        delivery.tanggalKirim,
        delivery.idCustomer,
        delivery.keterangan,
        delivery.isStatus,
        delivery.updatedBy,
        id,
      ];
  
      // Eksekusi query untuk update t_delivery
      const resDelivery = await client.query(queryDelivery, valuesDelivery);
  
      // Pembaruan untuk t_delivery_detail
      const queryDetail = `
        UPDATE t_delivery_detail
        SET qty = $1
        WHERE id = $2 AND id_delivery = $3
        RETURNING *
      `;
  
      for (let detail of delivery.details) {
        const valuesDetail = [detail.qty, detail.idDetail, id];
        await client.query(queryDetail, valuesDetail);
      }
  
      // Commit transaksi jika semua query berhasil
      await client.query('COMMIT');
      
      // Kembalikan hasil update pengiriman
      return resDelivery.rows[0];
    } catch (error) {
      // Rollback jika terjadi kesalahan
      await client.query('ROLLBACK');
      console.error("Error updating delivery:", error);
      throw error; // Lempar ulang error untuk penanganan lebih lanjut
    } finally {
      client.release(); // Pastikan koneksi dilepaskan
    }
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
