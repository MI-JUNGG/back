const { appDataSource } = require("./appDataSource");

const monthPage = async (userId, plusStartDate, plusEndDate) => {
  const palette = await appDataSource.query(
    `
  SELECT
    m.color_palette_id          AS colorPaletteId,
    m.color1                    AS color1,
    m.color2                    AS color2,
    m.color3                    AS color3,
    m.color4                    AS color4,
    m.color5                    AS color5,
    m.color6                    AS color6,
    m.color7                    AS color7
  FROM
    mypage m
  WHERE
    m.user_id = ?
  `,
    [userId]
  );

  const monthCard = await appDataSource.query(
    `
    SELECT
      c.id                        AS cardId,
      c.title                     AS title,
      c.repeat_id                 AS \`repeat\`,
      c.deadline                  AS deadline,
      c.memo                      AS memo,
      c.link                      AS link,
      c.color                     AS color,
      c.start_date                AS startDate,
      c.end_date                  AS endDate
    FROM
      card c
    LEFT JOIN mypage m            ON c.user_id = m.user_id
    WHERE c.user_id = ?
    AND DATE(c.start_date) >= ?
    AND DATE(c.end_date) <= ?
    ORDER BY c.start_date ASC
    `,
    [userId, plusStartDate, plusEndDate]
  );

  return { palette, monthCard };
};

const weekPage = async (userId, plusStartDate, plusEndDate) => {
  const result = await appDataSource.query(
    `
    SELECT
      c.id                        AS cardId,
      c.title                     AS title,
      c.repeat_id                 AS \`repeat\`,
      c.deadline                  AS deadline,
      c.memo                      AS memo,
      c.link                      AS link,
      c.start_date                AS startDate,
      c.end_date                  AS endDate
    FROM
      card c
    WHERE c.user_id = ?
    AND DATE(c.start_date) >= ?
    AND DATE(c.end_date) <= ?
    ORDER BY c.start_date ASC
    `,
    [userId, plusStartDate, plusEndDate]
  );

  return result;
};

const dayPage = async (userId, plusStartDate, plusEndDate) => {
  const result = await appDataSource.query(
    `
    SELECT
      c.id                        AS cardId,
      c.title                     AS title,
      c.color                     AS color,
      c.repeat_id                 AS \`repeat\`,
      c.deadline                  AS deadline,
      c.memo                      AS memo,
      c.link                      AS link,
      c.start_date                AS startDate,
      c.end_date                  AS endDate
    FROM
      card c
    WHERE c.user_id = ?
    AND DATE(c.start_date) >= ?
    AND DATE(c.start_date) <= ?
    ORDER BY c.start_date ASC
    `,
    [userId, plusStartDate, plusEndDate]
  );

  return result;
};

module.exports = {
  monthPage,
  weekPage,
  dayPage,
};
