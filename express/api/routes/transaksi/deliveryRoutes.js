const express = require("express");
const DeliveryController = require("../../controllers/transaksi/deliveryController");

const router = express.Router();

router.get("/all", DeliveryController.resolveAllDelivery);
router.get("/", DeliveryController.getAllDelivery);
router.get("/:id", DeliveryController.getDeliveryById);
router.get("/customer/:id", DeliveryController.getDeliveryByIdCustomer);
router.post("/", DeliveryController.createDeliveryWithDetails);
router.put("/:id", DeliveryController.updateDelivery);
router.delete("/:id", DeliveryController.deleteDelivery);

module.exports = router;
