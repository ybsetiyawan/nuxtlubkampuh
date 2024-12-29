const express = require("express");

// MASTER
const employeeRoutes = require("./routes/master/employeeRoutes");
const customerRoutes = require("./routes/master/customerRoutes");

// SETTING
const userRoutes = require("./routes/setting/userRoutes");
const roleRoutes = require("./routes/setting/roleRoutes");
const menuRoutes = require("./routes/setting/menuRoutes");
const menuUserRoutes = require("./routes/setting/menuUserRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

// if (process.env.APP_CORS_ENABLE === "true") {
//   const corsOptions = {
//     origin: process.env.APP_CORS_ALLOWED_ORIGINS.split(","),
//     methods: process.env.APP_CORS_ALLOWED_METHODS,
//     allowedHeaders: process.env.APP_CORS_ALLOWED_HEADERS,
//     credentials: process.env.APP_CORS_ALLOW_CREDENTIALS === "true",
//     maxAge: parseInt(process.env.APP_CORS_MAX_AGE_SECONDS, 10),
//   };

app.use(
  cors({
    origin: process.env.APP_CORS_ALLOWED_ORIGINS.split(","), // Sesuaikan dengan URL frontend Anda
    credentials: true,
    methods: process.env.APP_CORS_ALLOWED_METHODS,
    allowedHeaders: process.env.APP_CORS_ALLOWED_HEADERS,
  })
);
// }

app.use(express.json());

app.use("/api/employees", employeeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/menu-user", menuUserRoutes);
app.use("/api/customer", customerRoutes);

module.exports = app;
