const getpageService = require("../services/getpageService");
const { catchAsync, detectError } = require("../utils/detectError");
const dayjs = require("dayjs");

const monthPage = catchAsync(async (req, res) => {
  const { startDate, endDate } = req.query;
  const userId = req.userId;

  if (!userId || !startDate || !endDate)
    detectError("NEED_USER_ID OR NEED_DATE_INFO", 400);

  const plusStartDate = startDate + "T00:00:00";
  const plusEndDate = endDate + "T23:59:59";

  const result = await getpageService.monthPage(
    userId,
    plusStartDate,
    plusEndDate
  );

  const formattedData = {
    palette: result.palette,
    monthCard: result.monthCard.map((card) => ({
      ...card,
      deadline: dayjs(card.deadline).format("YYYY-MM-DD"),
      startDate: dayjs(card.startDate).format("YYYY-MM-DD HH:mm:ss"),
      endDate: dayjs(card.endDate).format("YYYY-MM-DD HH:mm:ss"),
    })),
  };

  return res.status(200).json(formattedData);
});

const weekPage = catchAsync(async (req, res) => {
  const { startDate, endDate } = req.query;
  const userId = req.userId;

  if (!userId || !startDate || !endDate)
    detectError("NEED_USER_ID OR NEED_DATE_INFO", 400);

  const plusStartDate = startDate + "T00:00:00";
  const plusEndDate = endDate + "T23:59:59";

  const result = await getpageService.weekPage(
    userId,
    plusStartDate,
    plusEndDate
  );

  const formattedResult = result.map((card) => ({
    ...card,
    deadline: dayjs(card.deadline).format("YYYY-MM-DD"),
    startDate: dayjs(card.startDate).format("YYYY-MM-DD HH:mm:ss"),
    endDate: dayjs(card.endDate).format("YYYY-MM-DD HH:mm:ss"),
  }));

  return res.status(200).json(formattedResult);
});

const dayPage = catchAsync(async (req, res) => {
  const { startDate } = req.query;
  const userId = req.userId;

  if (!userId || !startDate) detectError("NEED_USER_ID OR NEED_DATE_INFO", 400);

  const plusStartDate = startDate + "T00:00:00";
  const plusEndDate = startDate + "T23:59:59";

  const result = await getpageService.dayPage(
    userId,
    plusStartDate,
    plusEndDate
  );

  const formattedResult = result.map((card) => ({
    ...card,
    deadline: dayjs(card.deadline).format("YYYY-MM-DD"),
    startDate: dayjs(card.startDate).format("YYYY-MM-DD HH:mm:ss"),
    endDate: dayjs(card.endDate).format("YYYY-MM-DD HH:mm:ss"),
  }));

  return res.status(200).json(formattedResult);
});

module.exports = {
  monthPage,
  weekPage,
  dayPage,
};
