const MenuUserService = require("../../services/setting/menuUserService");

class MenuUserController {
  async resolveAllMenuUser(req, res) {
      try {
        const filters = {
          pageSize: parseInt(req.query.pageSize, 10) || 10,
          pageNumber: parseInt(req.query.pageNumber, 10) || 1,
          q: req.query.q,
          sortBy: req.query.sortBy || "nama_menu",
          sortType: req.query.sortType || "ASC",
        };
  
        const { users, totalItems } = await MenuUserService.resolveAllMenuUser(filters);
  
        const totalPage = Math.ceil(totalItems / filters.pageSize);
        const currentPage = filters.pageNumber;
        const previousPage = currentPage > 1 ? currentPage - 1 : null;
        const nextPage = currentPage < totalPage ? currentPage + 1 : null;
  
        const response = {
          data: {
            items: users.map((item) => ({
              id: item.id,
              id_menu: item.id_menu,
              namaMenu: item.nama_menu,
              parent: item.parent,
              namaParent: item.nama_parent,
              linkMenu: item.link || null,
              keterangan: item.keterangan || "",
              classIcon: item.classicon || "",
              urutan: item.urutan,
              level: item.level,
              idRole: item.id_role,
              namaRole: item.nama_role,
              isDeleted: item.is_deleted || false,
            })),
            meta: {
              totalItems,
              totalPage,
              previousPage,
              currentPage,
              nextPage,
              limitPerPage: filters.pageSize,
            },
          },
        };
  
        res.json(response);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }

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

  async updateMenuUser(req, res) {
      
      try {
        const updatedMenuUser = await MenuUserService.updateMenuUser(req.params.id, req.body);
        res.json({
          data: updatedMenuUser,
        });
        
      } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
      }
    }
  
  async deleteMenuUser(req, res) {
      try {
        const id = req.params.id;
        const deletedMenuUser = await MenuUserService.deleteMenuUser(id);
  
        if (!deletedMenuUser) {
          return res.status(404).json({
            data: {
              message: "Menu tidak ditemukan",
              success: false,
            },
          });
        }
  
        res.json({
          data: {
            message: "Data Berhasil di Hapus",
            success: true,
          },
        });
      } catch (error) {
        res.status(500).json({
          data: {
            message: error.message,
            success: false,
          },
        });
      }
    }
}

module.exports = new MenuUserController();
