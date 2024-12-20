const CustomerService = require("../../services/master/customerService");

class CustomerController {
  async resolveAllCustomer(req, res) {
    try {
      const filters = {
        pageSize: parseInt(req.query.pageSize, 10) || 10,
        pageNumber: parseInt(req.query.pageNumber, 10) || 1,
        q: req.query.q,
        sortBy: req.query.sortBy || "nama",
        sortType: req.query.sortType || "ASC",
      };

      const { customer, totalItems } = await CustomerService.resolveAllCustomer(
        filters
      );

      const totalPage = Math.ceil(totalItems / filters.pageSize);
      const currentPage = filters.pageNumber;
      const previousPage = currentPage > 1 ? currentPage - 1 : null;
      const nextPage = currentPage < totalPage ? currentPage + 1 : null;

      const response = {
        data: {
          items: customer.map((item) => ({
            id: item.id,
            nama: item.nama,
            kode: item.kode,
            email: item.email,
            npwp: item.npwp,
            alamat: item.alamat,
            noTelp: item.no_telp,
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

  async getCustomerAll(req, res) {
    try {
      const customer = await CustomerService.getCustomerAll();
      res.json({ data: customer });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getCustomerById(req, res) {
    try {
      const { id } = req.params;
      const customer = await CustomerService.getCustomerById(id);
      res.json({ data: customer });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async createCustomer(req, res) {
    try {
      const { kode, nama, email, alamat, noTelp, npwp } = req.body;

      const newCustomer = await CustomerService.createCustomer({
        kode,
        nama,
        email,
        alamat,
        noTelp,
        npwp,
      });
      res.json({
        data: newCustomer,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateCustomer(req, res) {
    try {
      const updatedCustomer = await CustomerService.updateCustomer(
        req.params.id,
        req.body
      );
      res.json({
        data: updatedCustomer,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async deleteCustomer(req, res) {
    try {
      const id = req.params.id;
      const deletedCustomer = await CustomerService.deleteCustomer(id);

      if (!deletedCustomer) {
        return res.status(404).json({
          data: {
            message: "Customer tidak ditemukan",
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

module.exports = new CustomerController();
