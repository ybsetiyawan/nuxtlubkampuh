const DeliveryRepositories = require("../../repositories/transaksi/deliveryRepository");
const { formatDeliveryAll } = require("../../models/transaksi/deliveryModel");

class DeliveryService {
  async resolveAllDeliveries(filters) {
    // Mendapatkan data dengan filters
    return await DeliveryRepositories.resolveAllDelivery(filters);
  }

  async getAllDelivery() {
    // Mendapatkan semua data delivery
    const delivery = await DeliveryRepositories.getAllDelivery();
    if (!delivery) {
      throw new Error("Delivery not found");
    }
    return delivery;
  }

  async getDeliveryById(id) {
    // Mendapatkan data delivery berdasarkan ID
    const delivery = await DeliveryRepositories.getDeliveryId(id);
    if (!delivery) {
      throw new Error("Delivery not found");
    }
    return delivery;
  }

  async getDeliveryByIdCustomer(id) {
    // Mendapatkan data delivery berdasarkan ID
    const delivery = await DeliveryRepositories.getDeliveryByIdCustomer(id);
    if (!delivery) {
      throw new Error("Delivery not found");
    }
    return delivery;
  }

  async createDeliveryWithDetails(deliveryData, details) {
    // Membuat data delivery dengan detail
    if (!deliveryData || !details || details.length === 0) {
      throw new Error("Invalid input: Delivery data or details are missing");
    }
    return await DeliveryRepositories.createDeliveryWithDetails(deliveryData, details);
  }

  async updateDelivery(id, deliveryData) {
    // Update data delivery berdasarkan ID
    const updatedDelivery = await DeliveryRepositories.updateDelivery(id, deliveryData);
    if (!updatedDelivery) {
      throw new Error("Delivery not found or update failed");
    }
    return updatedDelivery;
  }

  async deleteDelivery(id, updatedBy) {
    // Menghapus data delivery secara soft-delete
    const deletedDelivery = await DeliveryRepositories.deleteDelivery(id, updatedBy);
    if (!deletedDelivery) {
      throw new Error("Delivery not found or delete failed");
    }
    return deletedDelivery;
  }
}

module.exports = new DeliveryService();
