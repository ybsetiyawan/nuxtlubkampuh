// routes/index.js
const express = require('express');
const router = express.Router();

const menuRoutes = require("./setting/menuRoutes");
const menuUserRoutes = require("./setting/menuUserRoutes");
const authRoutes = require("./authRoutes");

router.use('/auth', authRoutes);       // Route autentikasi
router.use('/menu', menuRoutes);       // Route menu
router.use('/menu-user', menuUserRoutes); // Route menu user
module.exports = router;
