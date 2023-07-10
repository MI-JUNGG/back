const express = require("express");
const router = express.Router();
const { validateToken } = require("../utils/auth");

const getpageController = require("../controllers/getpageController");

router.get("/month", validateToken, getpageController.monthPage);
router.get("/week", validateToken, getpageController.weekPage);
router.get("/day", validateToken, getpageController.dayPage);

module.exports = {
  router,
};
