const { appDataSource } = require("./appDataSource");

// local - user인지 확인
const getUserId = async (email) => {
  return await appDataSource.query(
    `
    SELECT
      id
    FROM
      users
    WHERE
      email = ?
    `,
    [email]
  );
};

// user - password 생성
const getHashedPassword = async (email) => {
  const [{ password }] = await appDataSource.query(
    `
    SELECT
      password
    FROM
      users
    WHERE
      email = ?
    `,
    [email]
  );
  return password;
};

// local - user 생성
const localCreateUser = async (nickname, email, hashedPassword) => {
  return await appDataSource.query(
    `
    INSERT INTO users (
      nickname,
      email,
      password,
      social_type_id
    ) VALUES (
      ?,
      ?,
      ?,
      1
    )`,
    [nickname, email, hashedPassword]
  );
};

const checkUserById = async (socialId) => {
  const [userInfo] = await appDataSource.query(
    `
    SELECT
      id
    FROM
      users
    WHERE
      social_id = ?
    `,
    [socialId]
  );
  return userInfo;
};

const createUser = async (socialId, nickname, email, socialTypeId) => {
  return await appDataSource.query(
    `
    INSERT INTO users (
      social_id,
      nickname,
      email,
      social_type_id
    ) VALUES (
      ?,
      ?,
      ?,
      ?
    )`,
    [socialId, nickname, email, socialTypeId]
  );
};

const deleteUser = async (userId) => {
  return await appDataSource.query(
    `
  DELETE FROM
    users
  WHERE
    id = ?
  `,
    [userId]
  );
};

module.exports = {
  getUserId,
  getHashedPassword,
  checkUserById,
  createUser,
  localCreateUser,
  deleteUser,
};
