const CompanyRepository = require("../../repositories/master/companyRepository");
const { formatCompany } = require("../../models/master/companyModel ");

class CompanyService {
  async resolveAllCompany(filters) {
    return await CompanyRepository.resolveAllCompany(filters);
  }

  async getCompanyAll() {
    const company = await CompanyRepository.getCompanyAll();
    return company.map(formatCompany);
  }

  getCompanyById(id) {
    return CompanyRepository.getCompanyById(id);
  }

  createCompany(companyData) {
    return CompanyRepository.createCompany(companyData);
  }

  updateCompany(id, companyData) {
    return CompanyRepository.updateCompany(id, companyData);
  }

  async deleteCompany(id) {
    const result = await CompanyRepository.deleteCompany(id, {
      isDeleted: true,
    });
    return result;
  }
}

module.exports = new CompanyService();
