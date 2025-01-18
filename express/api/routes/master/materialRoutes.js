const express = require("express");
const MaterialController = require("../../controllers/master/materialController");
const verifyToken = require("../../middleware/auth");


const router = express.Router();

router.get("/all", verifyToken, MaterialController.resolveAllMaterial);
router.get("/", verifyToken, MaterialController.getAllMaterial);
router.get("/:id", verifyToken, MaterialController.getMaterialById);
router.post("/", verifyToken, MaterialController.createMaterial);
router.put("/:id", verifyToken, MaterialController.updateMaterial);
router.delete("/:id", verifyToken, MaterialController.deleteMaterial);

module.exports = router;
