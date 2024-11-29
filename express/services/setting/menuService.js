const MenuRepository = require("../../repositories/setting/menuRepository");
const { formatMenu } = require("../../models/setting/menuModel");

class MenuService {
  async resolveAllMenu(filters) {
    return await MenuRepository.resolveAllMenu(filters);
  }

  async createMenu(menuData) {
    const newMenu = await MenuRepository.createMenu(menuData);
    return formatMenu(newMenu);
  }

  async updateMenu(id, menuData) {
    const updatedMenu = await MenuRepository.updateMenu(id, menuData);
    return formatMenu(updatedMenu);
  }

  async getMenuAll() {
    const menus = await MenuRepository.getMenuAll();
    console.log("ssdd", menus);
    return menus.map(formatMenu);
  }

  async getMenuById(id) {
    const menu = await MenuRepository.getMenuById(id);
    if (!menu) {
      throw new Error("Menu not found");
    }
    return formatMenu(menu);
  }

  async deleteMenu(id) {
    const result = await MenuRepository.DeleteMenuStatus(id, {
      isDeleted: true,
    });
    return result;
  }
}

module.exports = new MenuService();
