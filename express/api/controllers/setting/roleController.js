const RolesService = require("../../services/setting/roleService");

class RolesController {

  async resolveAllRoles(req, res) {
      try {
        const filters = {
          pageSize: parseInt(req.query.pageSize, 10) || 30,
          pageNumber: parseInt(req.query.pageNumber, 10) || 1,
          q: req.query.q,
          sortBy: req.query.sortBy || "kode",
          sortType: req.query.sortType || "ASC",
        };
  
        const { users, totalItems } = await RolesService.resolveAllRoles(filters);
  
        const totalPage = Math.ceil(totalItems / filters.pageSize);
        const currentPage = filters.pageNumber;
        const previousPage = currentPage > 1 ? currentPage - 1 : null;
        const nextPage = currentPage < totalPage ? currentPage + 1 : null;
  
        const response = {
          data: {
            items: users.map((item) => ({
              id: item.id,
              kode: item.kode,
              nama: item.nama,
              createdAt: item.created_at || null,
              createdBy: item.created_by,
              updatedAt: item.updated_at,
              updatedBy: item.updated_by,
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


  async getAllRoles(req, res) {
    try {
      const roles = await RolesService.getAllRoles();
      res.json({ data: roles });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getRolesById(req, res) {
    try {
      const role = await RolesService.getRolesById(req.params.id);
      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }
      res.json(role);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createRole(req, res) {
    try {
      const newRole = await RolesService.createRoles(req.body);
      res.status(201).json(newRole);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateRole(req, res) {
    try {
      const updatedRole = await RolesService.updateRoles(
        req.params.id,
        req.body
      );
      res.json(updatedRole);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteRoles(req, res) {
    try {
      const deletedRole = await RolesService.deleteRoles(req.params.id);
      res.json(deletedRole);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  
}

module.exports = new RolesController();
