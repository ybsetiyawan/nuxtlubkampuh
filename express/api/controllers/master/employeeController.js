const EmployeeService = require("../../services/master/employeeService");

class EmployeeController {
  async getAllEmployees(req, res) {
    try {
      const employees = await EmployeeService.getAllEmployees();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getEmployeeById(req, res) {
    try {
      const employee = await EmployeeService.getEmployeeById(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(employee);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createEmployee(req, res) {
    try {
      const newEmployee = await EmployeeService.createEmployee(req.body);
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateEmployee(req, res) {
    try {
      const updatedEmployee = await EmployeeService.updateEmployee(
        req.params.id,
        req.body
      );
      res.json(updatedEmployee);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteEmployee(req, res) {
    try {
      const deletedEmployee = await EmployeeService.deleteEmployee(
        req.params.id
      );
      res.json(deletedEmployee);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new EmployeeController();
