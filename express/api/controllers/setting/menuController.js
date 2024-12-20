const MenuService = require("../../services/setting/menuService");

class MenuController {
  async resolveAllMenu(req, res) {
    try {
      const filters = {
        pageSize: parseInt(req.query.pageSize, 10) || 10,
        pageNumber: parseInt(req.query.pageNumber, 10) || 1,
        q: req.query.q,
        sortBy: req.query.sortBy || "nama_menu",
        sortType: req.query.sortType || "ASC",
      };

      const { users, totalItems } = await MenuService.resolveAllMenu(filters);

      const totalPage = Math.ceil(totalItems / filters.pageSize);
      const currentPage = filters.pageNumber;
      const previousPage = currentPage > 1 ? currentPage - 1 : null;
      const nextPage = currentPage < totalPage ? currentPage + 1 : null;

      const response = {
        data: {
          items: users.map((item) => ({
            id: item.id,
            namaMenu: item.nama_menu,
            linkMenu: item.link_menu,
            keterangan: item.keterangan || null,
            classIcon: item.class_icon || "",
            createdAt: item.created_at || null,
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

  async getMenuAll(req, res) {
    try {
      const menus = await MenuService.getMenuAll();
      res.json({ data: menus });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getMenuById(req, res) {
    try {
      const { id } = req.params;
      const menu = await MenuService.getMenuById(id);
      res.json({ data: menu });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async createMenu(req, res) {
    try {
      const { namaMenu, linkMenu, keterangan, classIcon, status } = req.body;

      const newMenu = await MenuService.createMenu({
        namaMenu,
        linkMenu,
        keterangan,
        classIcon,
        status,
      });
      res.json({
        data: newMenu,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateMenu(req, res) {
    try {
      const updatedMenu = await MenuService.updateMenu(req.params.id, req.body);
      res.json({
        data: updatedMenu,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async deleteMenu(req, res) {
    try {
      const id = req.params.id;
      const deletedMenu = await MenuService.deleteMenu(id);

      if (!deletedMenu) {
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

module.exports = new MenuController();
