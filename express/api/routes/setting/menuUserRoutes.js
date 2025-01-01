const express = require("express");
const MenuUserController = require("../../controllers/setting/menuUserController");
const verifyToken = require("../../middleware/auth");
const router = express.Router();

router.post("/", verifyToken, MenuUserController.createMenuUser);
router.get("/",  verifyToken, MenuUserController.getMenuUserByRoleId);
router.put("/:id", verifyToken, MenuUserController.updateMenuUser);
router.get("/all", verifyToken, MenuUserController.resolveAllMenuUser);
router.delete("/:id", verifyToken, MenuUserController.deleteMenuUser);



module.exports = router;
