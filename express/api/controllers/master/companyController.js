const CompanyService = require("../../services/master/companyService");

class CompanyController {
  async resolveAllCompany(req, res) {
    try {
      const filters = {
        pageSize: parseInt(req.query.pageSize, 10) || 30,
        pageNumber: parseInt(req.query.pageNumber, 10) || 1,
        q: req.query.q,
        sortBy: req.query.sortBy || "nama",
        sortType: req.query.sortType || "ASC",
      };

      const { company, totalItems } = await CompanyService.resolveAllCompany(filters);

      const totalPage = Math.ceil(totalItems / filters.pageSize);
      const currentPage = filters.pageNumber;
      const previousPage = currentPage > 1 ? currentPage - 1 : null;
      const nextPage = currentPage < totalPage ? currentPage + 1 : null;

      const response = {
        data: {
          items: company.map((item) => ({
            id: item.id,
            nama: item.nama,
            alamat: item.alamat,
            noTelp: item.no_telp || null,
            email: item.email || null,
            npwp: item.npwp || null,
            bank: item.bank || null,
            bankNo: item.bank_no || null,
            bankAn: item.bank_an || null,
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

  async getCompanyAll(req, res) {
    try {
      const company = await CompanyService.getCompanyAll();
      res.json({ data: company });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getCompanyById(req, res) {
    try {
      const { id } = req.params;
      const company = await CompanyService.getCompanyById(id);
      res.json({ data: company });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async createCompany(req, res) {
    try {
      const { nama, alamat, noTelp, email, npwp, bank, bankNo, bankAn } = req.body;
      const newCompany = await CompanyService.createCompany({
        nama,
        alamat,
        noTelp,
        email,
        npwp,
        bank,
        bankNo,
        bankAn,
      });
      res.json({
        data: newCompany,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateCompany(req, res) {
    
    try {
      const updatedCompany = await CompanyService.updateCompany(req.params.id, req.body);
      res.json({
        data: updatedCompany,
      });
      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  async deleteCompany(req, res) {
    try {
      const id = req.params.id;
      const deletedCompany = await CompanyService.deleteCompany(id);

      if (!deletedCompany) {
        return res.status(404).json({
          data: {
            message: "Company tidak ditemukan",
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

module.exports = new CompanyController();
