const express = require("express");
const RolesController = require("../../controllers/setting/roleController");

const router = express.Router();

router.get("/all", RolesController.resolveAllRoles);
router.get("/", RolesController.getAllRoles);
router.get("/:id", RolesController.getRolesById);
router.post("/", RolesController.createRole);
router.put("/:id", RolesController.updateRole);
router.delete("/:id", RolesController.deleteRoles);

module.exports = router;
