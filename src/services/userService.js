const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { detectError } = require("../utils/detectError");

const SocialTypeId = Object.freeze({
  LOCAL: 1,
  KAKAO: 2,
  NAVER: 3,
});

// LOCAL 회원가입
const signUp = async (nickname, email, password) => {
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );

  if (!pwValidation.test(password)) detectError("PASSWORD_ERROR", 400);

  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const createUser = await userDao.localCreateUser(
    nickname,
    email,
    hashedPassword
  );

  return createUser;
};

const signIn = async (email, password) => {
  const hashedPassword = await userDao.getHashedPassword(email);
  if (!hashedPassword) detectError("PASSWORD_DOES_NOT_MATCH", 400);

  const compare = await bcrypt.compare(password, hashedPassword);
  if (!compare) detectError("PASSWORD_DOES_NOT_MATCH", 400);

  const [userData] = await userDao.getUserId(email);

  const payLoad = { userId: userData.id };

  const jwtToken = jwt.sign(payLoad, process.env.JWT_SECRET);

  return jwtToken;
};

const kakaoLogin = async (kakaoToken) => {
  const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  if (!result) detectError("KAKAO_TOKEN_ERROR", 400);

  const { data } = result;
  const socialId = data.id;
  const nickname = data.properties.nickname;
  const email = data.kakao_account.email;
  const socialTypeId = SocialTypeId.KAKAO;

  const userId = await userDao.checkUserById(socialId);

  if (!userId) {
    const newUser = await userDao.createUser(
      socialId,
      nickname,
      email,
      socialTypeId
    );

    return (accessToken = jwt.sign(
      { userId: newUser.insertId },
      process.env.JWT_SECRET
    ));
  }
  return (accessToken = jwt.sign({ userId: userId }, process.env.JWT_SECRET));
};

// 네이버 로그인
const naverLogin = async (naverToken) => {
  const result = await axios.get("https://openapi.naver.com/v1/nid/me", {
    headers: {
      Authorization: `Bearer ${naverToken}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  if (!result) detectError("NAVER_TOKEN_ERROR", 400);

  const { data } = result;
  const socialId = data.response.id;
  const nickname = data.response.name;
  const email = data.response.email;
  const socialTypeId = SocialTypeId.NAVER;

  const userId = await userDao.checkUserById(socialId);

  if (!userId) {
    const newUser = await userDao.createUser(
      socialId,
      nickname,
      email,
      socialTypeId
    );

    return (accessToken = jwt.sign(
      { userId: newUser.insertId },
      process.env.JWT_SECRET
    ));
  }
  return (accessToken = jwt.sign({ userId: userId }, process.env.JWT_SECRET));
};

// 탈퇴
const deleteUser = async (token) => {
  const deleteUser = jwt.verify(token, process.env.JWT_SECRET);
  const userId = deleteUser.userId;

  return await userDao.deleteUser(userId);
};

module.exports = {
  signUp,
  signIn,
  kakaoLogin,
  naverLogin,
  deleteUser,
};
