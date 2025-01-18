const MaterialService = require("../../services/master/materialService");

class MaterialController {

  async resolveAllMaterial(req, res) {
      try {
        const filters = {
          pageSize: parseInt(req.query.pageSize, 10) || 30,
          pageNumber: parseInt(req.query.pageNumber, 10) || 1,
          q: req.query.q,
          sortBy: req.query.sortBy || "kode",
          sortType: req.query.sortType || "ASC",
        };
  
        const { material, totalItems } = await MaterialService.resolveAllMaterial(filters);
  
        const totalPage = Math.ceil(totalItems / filters.pageSize);
        const currentPage = filters.pageNumber;
        const previousPage = currentPage > 1 ? currentPage - 1 : null;
        const nextPage = currentPage < totalPage ? currentPage + 1 : null;
  
        const response = {
          data: {
            items: material.map((item) => ({
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


  async getAllMaterial(req, res) {
    try {
      const material = await MaterialService.getAllMaterial();
      res.json({ data: material });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getMaterialById(req, res) {
    try {
      const material = await MaterialService.getMaterialById(req.params.id);
      if (!material) {
        return res.status(404).json({ message: "Material not found" });
      }
      res.json(material);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createMaterial(req, res) {
    try {
      const newMaterial = await MaterialService.createMaterial(req.body);
      res.status(201).json(newMaterial);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateMaterial(req, res) {
    try {
      const updatedMaterial = await MaterialService.updateMaterial(
        req.params.id,
        req.body
      );
      res.json(updatedMaterial);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteMaterial(req, res) {
      try {
        const { id } = req.params;
        const { updatedBy } = req.query; // Ambil updatedBy dari query parameter
    
        if (!updatedBy) {
          return res.status(400).json({ message: 'updatedBy is required' });
        }
    
        const deletedMaterial = await MaterialService.deleteMaterial(id, updatedBy);
        res.json(deletedMaterial);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  
}

module.exports = new MaterialController();
