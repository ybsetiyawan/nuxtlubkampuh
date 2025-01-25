const DeliveryService = require("../../services/transaksi/deliveryService");

class DeliveryController {
  async resolveAllDelivery(req, res) {
    try {
      const filters = {
        pageSize: parseInt(req.query.pageSize, 10) || 30,
        pageNumber: parseInt(req.query.pageNumber, 10) || 1,
        q: req.query.q,
        sortBy: req.query.sortBy || "tanggal_kirim",
        sortType: req.query.sortType || "ASC",
      };

      const { deliveries, totalItems } = await DeliveryService.resolveAllDeliveries(filters);

      const totalPage = Math.ceil(totalItems / filters.pageSize);
      const currentPage = filters.pageNumber;
      const previousPage = currentPage > 1 ? currentPage - 1 : null;
      const nextPage = currentPage < totalPage ? currentPage + 1 : null;

      const response = {
        data: {
          items: deliveries.map((item) => ({
            id: item.id,
            docNo: item.doc_no,
            tanggalKirim: item.tanggal_kirim,
            idCustomer: item.id_customer,
            keterangan: item.keterangan,
            isStatus: item.is_status,
            createdAt: item.created_at || null,
            createdBy: item.created_by,
            updatedAt: item.updated_at,
            updatedBy: item.updated_by,
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

  async getAllDelivery(req, res) {
    try {
      const delivery = await DeliveryService.getAllDelivery();
      if (!delivery) {
        return res.status(404).json({ message: "Delivery not found" });
      }
      res.json(delivery);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getDeliveryById(req, res) {
    try {
      const delivery = await DeliveryService.getDeliveryById(req.params.id);
      if (!delivery) {
        return res.status(404).json({ message: "Delivery not found" });
      }
      res.json(delivery);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getDeliveryByIdCustomer(req, res) {
    try {
      const delivery = await DeliveryService.getDeliveryByIdCustomer(req.params.id);
      if (!delivery) {
        return res.status(404).json({ message: "Delivery not found" });
      }
      res.json(delivery);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createDeliveryWithDetails(req, res) {
    try {
      const { delivery, details } = req.body;
      if (!delivery || !details || details.length === 0) {
        return res.status(400).json({ message: "Delivery or details are missing" });
      }
      const newDelivery = await DeliveryService.createDeliveryWithDetails(delivery, details);
      res.status(201).json(newDelivery);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateDelivery(req, res) {
    try {
      const updatedDelivery = await DeliveryService.updateDelivery(req.params.id, req.body);
      if (!updatedDelivery) {
        return res.status(404).json({ message: "Delivery not found or update failed" });
      }
      res.json(updatedDelivery);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteDelivery(req, res) {
    try {
      const { id } = req.params;
      const { updatedBy } = req.query; // Ambil updatedBy dari query parameter

      if (!updatedBy) {
        return res.status(400).json({ message: "updatedBy is required" });
      }

      const deletedDelivery = await DeliveryService.deleteDelivery(id, updatedBy);
      if (!deletedDelivery) {
        return res.status(404).json({ message: "Delivery not found or delete failed" });
      }
      res.json(deletedDelivery);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new DeliveryController();
