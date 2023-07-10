const getpageDao = require("../models/getpageDao");

const monthPage = async (userId, plusStartDate, plusEndDate) => {
  const result = await getpageDao.monthPage(userId, plusStartDate, plusEndDate);

  return result;
};

const weekPage = async (userId, plusStartDate, plusEndDate) => {
  const result = await getpageDao.weekPage(userId, plusStartDate, plusEndDate);

  return result;
};

const dayPage = async (userId, plusStartDate, plusEndDate) => {
  const result = await getpageDao.dayPage(userId, plusStartDate, plusEndDate);

  return result;
};

module.exports = {
  monthPage,
  weekPage,
  dayPage,
};
