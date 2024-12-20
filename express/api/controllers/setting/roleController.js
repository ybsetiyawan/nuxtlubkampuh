const RolesService = require("../../services/setting/roleService");

class RolesController {
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
