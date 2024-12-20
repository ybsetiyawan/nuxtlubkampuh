const express = require("express");
const MenuController = require("../../controllers/setting/menuController");
const verifyToken = require("../../middleware/auth");
const router = express.Router();

router.post("/", verifyToken, MenuController.createMenu); // Endpoint untuk membuat user baru
router.get("/", verifyToken, MenuController.resolveAllMenu);
router.get("/:id", verifyToken, MenuController.getMenuById);
router.put("/:id", verifyToken, MenuController.updateMenu);
router.get("/all/all", verifyToken, MenuController.getMenuAll);
router.delete("/:id", verifyToken, MenuController.deleteMenu);

module.exports = router;
