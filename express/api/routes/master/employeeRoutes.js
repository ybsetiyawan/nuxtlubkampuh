const express = require("express");
const EmployeeController = require("../../controllers/master/employeeController");

const router = express.Router();

router.get("/", EmployeeController.getAllEmployees);
router.get("/:id", EmployeeController.getEmployeeById);
router.post("/", EmployeeController.createEmployee);
router.put("/:id", EmployeeController.updateEmployee);
router.delete("/:id", EmployeeController.deleteEmployee);

module.exports = router;
