const express = require("express");
const router = express.Router();
const { validateToken } = require("../utils/auth");

const mypageController = require("../controllers/mypageController");

router.get("/", validateToken, mypageController.mypageInfo);
router.put("/changeInfo", validateToken, mypageController.changeMypage);
router.get("/theme", validateToken, mypageController.getTheme);
router.put("/theme", validateToken, mypageController.changeTheme);

module.exports = {
  router,
};
