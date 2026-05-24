const express = require("express");
const router = express.Router();

const kurirController = require("../controllers/kurir.controller");

router.get("/search", kurirController.searchDestination);
router.post("/cost", kurirController.calculateCost);

router.get("/provinces", kurirController.getProvinces);
router.get("/cities/:provinceId", kurirController.getCities);
router.get("/districts/:cityId", kurirController.getDistricts);
router.get("/subdistricts/:districtId", kurirController.getSubdistricts);

module.exports = router;