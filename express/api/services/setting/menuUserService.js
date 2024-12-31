const MenuUserRepository = require("../../repositories/setting/menuUserRepository");
const { formatMenuUser } = require("../../models/setting/menuUserModel");

class MenuUserService {
  async resolveAllMenuUser(filters) {
      return await MenuUserRepository.resolveAllMenuUser(filters);
  }

  async createMenuUser(menuUserData) {
    const newMenuUser = await MenuUserRepository.createMenuUser(menuUserData);
    return newMenuUser.map(formatMenuUser);
  }

  async updateMenuUser(id, menuUserData) {
    const updatedMenuUser = await MenuUserRepository.updateMenuUser(id, menuUserData);
    return formatMenuUser(updatedMenuUser);
  }

  async getMenuUserByRoleId(roleId) {
    const parentMenus = await MenuUserRepository.getMenuUserByRoleId(roleId);

    for (let parent of parentMenus) {
      const children = await MenuUserRepository.getChildrenMenusByParentId(
        parent.id_menu,
        roleId
      );
      parent.children =
        children.length > 0
          ? children.map((child) => ({
              id: child.id || "",
              idMenu: child.id_menu,
              nama: child.nama,
              link: child.link,
              keterangan: child.keterangan || null,
              classIcon: child.classicon || null,
              level: child.level,
              urutan: child.urutan,
              posisi: "",
              isPermission: child.ispermission || false,
              parent: child.parent || null,
            }))
          : [];
    }

    return parentMenus.map((parent) => ({
      id: parent.id || "",
      idMenu: parent.id_menu,
      nama: parent.nama,
      link: parent.link,
      keterangan: parent.keterangan || null,
      classIcon: parent.classicon || null,
      level: parent.level,
      urutan: parent.urutan,
      isPermission: parent.isPermission || false,
      parent: parent.parent || null,
      children: parent.children,
    }));
  }
}

module.exports = new MenuUserService();
