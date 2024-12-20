const pool = require("../../config/db");
const { v4: uuidv4 } = require("uuid");

class MenuUserRepository {
  async createMenuUser(menuUserData) {
    try {
      const results = [];

      // Proses setiap item di array idMenu
      for (const idMenu of menuUserData.idMenu) {
        // Cek urutan terakhir berdasarkan kondisi yang ada
        let urutResult;
        if (menuUserData.parent) {
          urutResult = await pool.query(
            `SELECT urutan FROM menu_user 
                  WHERE posisi::varchar = $1 
                  AND level = $2 
                  AND parent = $3 
                  AND id_role::varchar = $4 
                  AND COALESCE(is_deleted, false) = false 
                  AND status = '1'
                  ORDER BY urutan DESC 
                  LIMIT 1`,
            [
              menuUserData.posisi,
              menuUserData.level,
              menuUserData.parent,
              menuUserData.idRole,
            ]
          );
        } else {
          urutResult = await pool.query(
            `SELECT urutan FROM menu_user 
                  WHERE posisi::varchar = $1 
                  AND level = $2 
                  AND id_role::varchar = $3 
                  AND COALESCE(is_deleted, false) = false 
                  AND status = '1'
                  ORDER BY urutan DESC 
                  LIMIT 1`,
            [menuUserData.posisi, menuUserData.level, menuUserData.idRole]
          );
        }

        // Tentukan nilai urutan baru
        const urutan =
          urutResult.rows.length > 0 ? urutResult.rows[0].urutan + 1 : 1;

        // Lakukan insert ke tabel menu_user
        const id = uuidv4();
        const result = await pool.query(
          `INSERT INTO menu_user (id, id_menu, posisi, level, urutan, status, parent, id_role)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
               RETURNING *`,
          [
            id,
            idMenu,
            menuUserData.posisi,
            menuUserData.level,
            urutan,
            menuUserData.status || "1",
            menuUserData.parent,
            menuUserData.idRole,
          ]
        );

        results.push(result.rows[0]);
      }

      return results;
    } catch (error) {
      console.error("Error creating menu user:", error);
      throw error;
    }
  }

  async getMenuUserByRoleId(roleId) {
    const query = `
      SELECT 
        mu.id, 
        m.id AS id_menu, 
        m.nama_menu AS nama, 
        m.link_menu AS link, 
        m.keterangan, 
        m.class_icon AS classIcon, 
        m.is_permission AS isPermission, 
        mu.level, 
        mu.urutan,
        mu.parent
    FROM menu_user mu 
    JOIN menu m on mu.id_menu = m.id 
    WHERE mu.id_role = $1 AND mu.level = 1
    ORDER BY mu.urutan ASC
    `;
    const res = await pool.query(query, [roleId]);
    return res.rows;
  }

  async getChildrenMenusByParentId(parentId, roleId) {
    const query = `
      SELECT 
        mu.id, 
        m.id AS id_menu, 
        m.nama_menu AS nama, 
        m.link_menu AS link, 
        m.keterangan, 
        m.class_icon AS classIcon, 
        m.is_permission AS isPermission, 
        mu.level, 
        mu.urutan,
        mu.parent
      FROM menu_user mu 
      JOIN menu m ON mu.id_menu = m.id 
      WHERE mu.parent = $1 
      AND mu.id_role = $2
      AND mu.level = 2
      AND m.status='1'
      ORDER BY mu.urutan ASC
    `;
    const res = await pool.query(query, [parentId, roleId]);
    return res.rows;
  }
}

module.exports = new MenuUserRepository();
