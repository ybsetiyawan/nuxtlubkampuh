const express = require("express");
const CustomerController = require("../../controllers/master/customerController");
const verifyToken = require("../../middleware/auth");
const router = express.Router();

router.post("/", verifyToken, CustomerController.createCustomer); // Endpoint untuk membuat user baru
router.get("/", verifyToken, CustomerController.resolveAllCustomer);
router.get("/:id", verifyToken, CustomerController.getCustomerById);
router.put("/:id", verifyToken, CustomerController.updateCustomer);
router.get("/all/all", verifyToken, CustomerController.getCustomerAll);
router.delete("/:id", verifyToken, CustomerController.deleteCustomer);

module.exports = router;
