const { appDataSource } = require("./appDataSource");

const postCard = async (
  userId,
  repeatId,
  title,
  color,
  link,
  memo,
  formattedStartDate,
  formattedEndDate,
  formatteddeadlineDate
) => {
  return await appDataSource.query(
    `
    INSERT INTO card (
      user_id,
      repeat_id,
      title,
      color,
      link,
      memo,
      start_date,
      end_date,
      deadline
    ) VALUES (
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?
    )`,
    [
      userId,
      repeatId,
      title,
      color,
      link,
      memo,
      formattedStartDate,
      formattedEndDate,
      formatteddeadlineDate,
    ]
  );
};

const patchCard = async (
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
) => {
  const result = await appDataSource.query(
    `
    UPDATE
      card
    SET
      repeat_id = ?,
      title = ?,
      color = ?,
      link = ?,
      memo = ?,
      start_date = ?,
      end_date = ?,
      deadline = ?
    WHERE
      id = ? AND user_id = ?
    `,
    [
      repeatId,
      title,
      color,
      link,
      memo,
      formattedStartDate,
      formattedEndDate,
      formatteddeadlineDate,
      cardId,
      userId,
    ]
  );

  return result;
};

const deleteCard = async (cardId, userId) => {
  return await appDataSource.query(
    `
    DELETE FROM
     card
    WHERE
      id = ? AND user_id = ?
     `,
    [cardId, userId]
  );
};

module.exports = {
  postCard,
  patchCard,
  deleteCard,
};
