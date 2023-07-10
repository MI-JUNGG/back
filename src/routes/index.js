const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const mypageRouter = require("./mypageRouter");
const cardRouter = require("./cardRouter");
const getpageRouter = require("./getPageRouter");

router.use("/auth", userRouter.router);
router.use("/mypage", mypageRouter.router);
router.use("/card", cardRouter.router);
router.use("/", getpageRouter.router);

module.exports = router;
