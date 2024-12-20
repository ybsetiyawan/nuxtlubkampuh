const MenuUserService = require("../../services/setting/menuUserService");

class MenuUserController {
  async createMenuUser(req, res) {
    try {
      const { idMenu, posisi, level, urutan, status, parent, idRole } =
        req.body;

      const newMenuUser = await MenuUserService.createMenuUser({
        idMenu,
        posisi,
        level,
        urutan,
        status,
        parent,
        idRole,
      });
      res.json({
        data: newMenuUser,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getMenuUserByRoleId(req, res) {
    const { roleId } = req.query; // Ambil idRole dari query parameter

    if (!roleId) {
      return res
        .status(400)
        .json({ message: "idRole query parameter is required" });
    }

    try {
      const menuData = await MenuUserService.getMenuUserByRoleId(roleId);

      if (!menuData || menuData.length === 0) {
        return res
          .status(404)
          .json({ message: "Menu not found for this role ID" });
      }

      res.json({
        data: menuData,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new MenuUserController();
