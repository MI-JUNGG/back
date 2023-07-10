const bcrypt = require("bcrypt");
const { appDataSource } = require("./appDataSource");

const mypageInfo = async (userId) => {
  return await appDataSource.query(
    `
    SELECT
      social_type_id       AS socialTypeId,
      email                AS email,
      nickname             AS nickname
    FROM
      users
    WHERE
      id = ?
    `,
    [userId]
  );
};

const changeNickname = async (nickname, userId) => {
  return await appDataSource.query(
    `
    UPDATE
      users
    SET
     nickname = ?
    WHERE
      id = ?
    `,
    [nickname, userId]
  );
};

const getHashedPassword = async (userId) => {
  const password = appDataSource.query(
    `
    SELECT
      password
    FROM
      users
    WHERE
      id = ?
    `,
    [userId]
  );
  return password;
};

const updatePassword = async (userId, hashedNewPassword) => {
  return await appDataSource.query(
    `
      UPDATE
        users
      SET
        password = ?
      WHERE
        id = ?
      `,
    [hashedNewPassword, userId]
  );
};

const getTheme = async (userId) => {
  const themeResult = await appDataSource.query(
    `
    SELECT
      m.main_color                     AS mainColor,
      m.background_color               AS backgroundColor,
      m.text_style                     AS textStyle,
      m.text_color                     AS textColor,
      m.color_palette_id               AS colorPaletteId,
      m.color1,
      m.color2,
      m.color3,
      m.color4,
      m.color5,
      m.color6,
      m.color7
    FROM
      mypage m
    JOIN
      color_palette
    ON m.color_palette_id = color_palette.id
    WHERE
      user_id = ?
    `,
    [userId]
  );

  const colorPaletteId = themeResult[0].colorPaletteId;

  const colorPaletteResult = await appDataSource.query(
    `
    SELECT
      color1,
      color2,
      color3,
      color4,
      color5,
      color6
    FROM
      color_palette
    WHERE
      id = ?
    `,
    [colorPaletteId]
  );

  const theme = {
    ...themeResult[0],
    colorPalette: colorPaletteResult[0],
  };

  return theme;
};

const changeTheme = async (
  mainColor,
  backgroundColor,
  textStyle,
  textColor,
  colorPaletteId,
  userId
) => {
  return await appDataSource.query(
    `
    UPDATE
      mypage
    SET
      main_color = ?,
      background_color = ?,
      text_style = ?,
      text_color = ?,
      color_palette_id = ?
    WHERE
      user_id = ?
    `,
    [mainColor, backgroundColor, textStyle, textColor, colorPaletteId, userId]
  );
};

const Custom = async (
  mainColor,
  backgroundColor,
  textStyle,
  textColor,
  colorPaletteId,
  color1,
  color2,
  color3,
  color4,
  color5,
  color6,
  color7,
  userId
) => {
  const previousColors = await appDataSource.query(
    `
    SELECT
      color1,
      color2,
      color3,
      color4,
      color5,
      color6,
      color7
    FROM mypage
    WHERE user_id = ?
    `,
    [userId]
  );

  const {
    color1: prevColor1,
    color2: prevColor2,
    color3: prevColor3,
    color4: prevColor4,
    color5: prevColor5,
    color6: prevColor6,
    color7: prevColor7,
  } = previousColors[0];

  return await appDataSource.query(
    `
    UPDATE mypage
    SET
      main_color = ?,
      background_color = ?,
      text_style = ?,
      text_color = ?,
      color_palette_id = ?,
      color1 = ?,
      color2 = ?,
      color3 = ?,
      color4 = ?,
      color5 = ?,
      color6 = ?,
      color7 = ?
    WHERE
      user_id = ?
    `,
    [
      mainColor,
      backgroundColor,
      textStyle,
      textColor,
      colorPaletteId,
      color1 || prevColor1,
      color2 || prevColor2,
      color3 || prevColor3,
      color4 || prevColor4,
      color5 || prevColor5,
      color6 || prevColor6,
      color7 || prevColor7,
      userId,
    ]
  );
};

module.exports = {
  mypageInfo,
  changeNickname,
  getHashedPassword,
  updatePassword,
  getTheme,
  changeTheme,
  Custom,
};
