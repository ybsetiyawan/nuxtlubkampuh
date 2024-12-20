const CustomerRepository = require("../../repositories/master/customerRepository");
const { formatCustomer } = require("../../models/master/customerModel");

class CustomerService {
  async resolveAllCustomer(filters) {
    return await CustomerRepository.resolveAllCustomer(filters);
  }

  async createCustomer(customerData) {
    const newCustomer = await CustomerRepository.createCustomer(customerData);
    return formatCustomer(newCustomer);
  }

  async updateCustomer(id, customerData) {
    const updatedCustomer = await CustomerRepository.updateCustomer(
      id,
      customerData
    );
    return formatCustomer(updatedCustomer);
  }

  async getCustomerAll() {
    const customers = await CustomerRepository.getCustomerAll();
    return customers.map(formatCustomer);
  }

  async getCustomerById(id) {
    const customer = await CustomerRepository.getCustomerById(id);
    if (!customer) {
      throw new Error("customer not found");
    }
    return formatCustomer(customer);
  }

  async deleteCustomer(id) {
    const result = await CustomerRepository.DeleteCustomerStatus(id, {
      isDeleted: true,
    });
    return result;
  }
}

module.exports = new CustomerService();
