const RolesRepository = require("../../repositories/setting/roleRepository");
const { formatRoleAll } = require("../../models/setting/roleModel");

class RolesService {
  async getAllRoles() {
    const roles = await RolesRepository.getAllRoles();
    return roles.map(formatRoleAll);
  }

  getRolesById(id) {
    return RolesRepository.getRolesById(id);
  }

  createRoles(rolesData) {
    return RolesRepository.createRoles(rolesData);
  }

  updateRoles(id, rolesData) {
    return RolesRepository.updateRoles(id, rolesData);
  }

  deleteRoles(id) {
    return RolesRepository.deleteRoles(id);
  }
}

module.exports = new RolesService();
