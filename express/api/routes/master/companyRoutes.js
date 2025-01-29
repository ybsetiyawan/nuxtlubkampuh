const express = require("express");
const CompanyController = require("../../controllers/master/companyController");
const verifyToken = require("../../middleware/auth");


const router = express.Router();

router.get("/all", verifyToken, CompanyController.resolveAllCompany);
router.get("/", verifyToken, CompanyController.getCompanyAll);
router.get("/:id", verifyToken, CompanyController.getCompanyById);
router.post("/", verifyToken, CompanyController.createCompany);
router.put("/:id", verifyToken, CompanyController.updateCompany);
router.delete("/:id", verifyToken, CompanyController.deleteCompany);

module.exports = router;
