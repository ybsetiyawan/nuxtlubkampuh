const pool = require("../../config/db");
const { v4: uuidv4 } = require("uuid");

class EmployeeRepository {
  async getAllEmployees() {
    const res = await pool.query("SELECT * FROM m_employe");
    return res.rows;
  }

  async getEmployeeById(id) {
    const res = await pool.query("SELECT * FROM m_employe WHERE id = $1", [id]);
    return res.rows[0];
  }

  async createEmployee(employee) {
    // Generate UUID
    const id = uuidv4();

    const res = await pool.query(
      "INSERT INTO m_employe (id, kode, nama) VALUES ($1, $2, $3) RETURNING *",
      [id, employee.kode, employee.nama]
    );
    return res.rows[0];
  }

  async updateEmployee(id, employee) {
    const res = await pool.query(
      "UPDATE m_employe SET kode = $1, nama = $2 WHERE id = $4 RETURNING *",
      [employee.kode, employee.nama, id]
    );
    return res.rows[0];
  }

  async deleteEmployee(id) {
    const res = await pool.query(
      "DELETE FROM m_employe WHERE id = $1 RETURNING *",
      [id]
    );
    return res.rows[0];
  }
}

module.exports = new EmployeeRepository();
