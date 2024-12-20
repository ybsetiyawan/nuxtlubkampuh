const express = require("express");
const UserController = require("../../controllers/setting/userController");
const verifyToken = require("../../middleware/auth");
const router = express.Router();

router.post("/", UserController.createUser); // Endpoint untuk membuat user baru
router.get("/", verifyToken, UserController.resolveAllUsers);
router.post("/login", UserController.login); // Endpoint untuk login
router.get("/:username", UserController.getUserByUsername); // Endpoint untuk mendapatkan user berdasarkan username

module.exports = router;
