const EmployeeRepository = require("../../repositories/master/employeeRepository");

class EmployeeService {
  getAllEmployees() {
    return EmployeeRepository.getAllEmployees();
  }

  getEmployeeById(id) {
    return EmployeeRepository.getEmployeeById(id);
  }

  createEmployee(employeeData) {
    return EmployeeRepository.createEmployee(employeeData);
  }

  updateEmployee(id, employeeData) {
    return EmployeeRepository.updateEmployee(id, employeeData);
  }

  deleteEmployee(id) {
    return EmployeeRepository.deleteEmployee(id);
  }
}

module.exports = new EmployeeService();
