const pool = require("../../config/db");
const { v4: uuidv4 } = require("uuid");

class RolesRepository {
  async getAllRoles() {
    const res = await pool.query("SELECT * FROM c_role");
    return res.rows;
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
      "UPDATE c_role SET kode = $1, nama = $2 WHERE id = $4 RETURNING *",
      [role.kode, role.nama, id]
    );
    return res.rows[0];
  }

  async deleteRole(id) {
    const res = await pool.query(
      "DELETE FROM c_role WHERE id = $1 RETURNING *",
      [id]
    );
    return res.rows[0];
  }
}

module.exports = new RolesRepository();
