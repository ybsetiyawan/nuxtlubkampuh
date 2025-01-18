const MaterialRepository = require("../../repositories/master/materialRepository");
const { formatMaterialAll } = require("../../models/master/materialModel");

class MaterialService {
  async resolveAllMaterial(filters) {
      return await MaterialRepository.resolveAllMaterial(filters);
  }

  async getAllMaterial() {
    const material = await MaterialRepository.getAllMaterial();
    return material.map(formatMaterialAll);
  }

  getMaterialById(id) {
    return MaterialRepository.getMaterialById(id);
  }

  createMaterial(materialData) {
    return MaterialRepository.createMaterial(materialData);
  }

  updateMaterial(id, materialData) {
    return MaterialRepository.updateMaterial(id, materialData);
  }

  deleteMaterial(id, materialData) {
    return MaterialRepository.deleteMaterial(id, materialData);
  }
}

module.exports = new MaterialService();
