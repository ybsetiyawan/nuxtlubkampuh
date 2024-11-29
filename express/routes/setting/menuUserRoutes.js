const express = require("express");
const MenuUserController = require("../../controllers/setting/menuUserController");
const verifyToken = require("../../middleware/auth");
const router = express.Router();

router.post("/", verifyToken, MenuUserController.createMenuUser);
router.get("/",  MenuUserController.getMenuUserByRoleId);

module.exports = router;
