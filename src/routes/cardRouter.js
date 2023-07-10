const express = require("express");
const router = express.Router();
const { validateToken } = require("../utils/auth");

const cardController = require("../controllers/cardController");

router.post("/", validateToken, cardController.postCard);
router.put("/", validateToken, cardController.patchCard);
router.delete("/", validateToken, cardController.deleteCard);

module.exports = {
  router,
};
