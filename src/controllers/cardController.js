const cardService = require("../services/cardService");
const { catchAsync, detectError } = require("../utils/detectError");
const dayjs = require("dayjs");

const postCard = catchAsync(async (req, res) => {
  const userId = req.userId;
  const { repeatId, title, color, link, memo, startDate, endDate, deadline } =
    req.body;

  if (!userId || !repeatId || !title || !color || !startDate || !endDate)
    detectError("KEY_ERROR", 400);

  const formattedStartDate = dayjs(startDate).format("YYYY-MM-DD HH:mm:ss");
  const formattedEndDate = dayjs(endDate).format("YYYY-MM-DD HH:mm:ss");
  const formatteddeadlineDate = dayjs(deadline).format("YYYY-MM-DD HH:mm:ss");

  await cardService.postCard(
    userId,
    repeatId,
    title,
    color,
    link,
    memo,
    formattedStartDate,
    formattedEndDate,
    formatteddeadlineDate
  );
  return res.status(201).json({ message: "CARD_CREATED!" });
});

const patchCard = catchAsync(async (req, res) => {
  const userId = req.userId;
  const {
    repeatId,
    title,
    color,
    link,
    memo,
    startDate,
    endDate,
    deadline,
    cardId,
  } = req.body;

  if (!cardId || !userId) detectError("NEED_USER_ID OR NEED_CARD_ID)", 400);

  const formattedStartDate = dayjs(startDate).format("YYYY-MM-DD HH:mm:ss");
  const formattedEndDate = dayjs(endDate).format("YYYY-MM-DD HH:mm:ss");
  const formatteddeadlineDate = dayjs(deadline).format("YYYY-MM-DD HH:mm:ss");

  await cardService.patchCard(
    repeatId,
    title,
    color,
    link,
    memo,
    formattedStartDate,
    formattedEndDate,
    formatteddeadlineDate,
    cardId,
    userId
  );
  return res.status(201).json({ message: "CARD_UPDATED!" });
});

const deleteCard = catchAsync(async (req, res) => {
  const userId = req.userId;
  const { cardId } = req.body;

  if (!cardId || !userId) detectError("NEED_CARD_ID OR NEED_USER_ID", 400);

  await cardService.deleteCard(cardId, userId);
  return res.status(201).json({ message: "CARD_DELETED!" });
});

module.exports = {
  postCard,
  patchCard,
  deleteCard,
};
