const express = require("express");
const MenuController = require("../../controllers/setting/menuController");
const verifyToken = require("../../middleware/auth");
const router = express.Router();

router.post("/",MenuController.createMenu); // Endpoint untuk membuat MENU baru
router.get("/",MenuController.resolveAllMenu);
router.get("/:id", verifyToken, MenuController.getMenuById);
router.put("/:id", MenuController.updateMenu);
router.get("/all/all", verifyToken, MenuController.getMenuAll);
router.delete("/:id", MenuController.deleteMenu);

module.exports = router;
