const userService = require("../services/userService");
const { catchAsync, detectError } = require("../utils/detectError");

// local - 회원가입
const signUp = catchAsync(async (req, res) => {
  const { nickname, email, password } = req.body;

  if (!nickname || !email || !password) detectError("KEY_ERROR", 400);

  await userService.signUp(nickname, email, password);

  return res.status(201).json({ message: "USER_CREATED!" });
});

// local - 로그인
const signIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) detectError("KEY_ERROR", 400);

  jwtToken = await userService.signIn(email, password);

  return res.status(200).json({ accessToken: jwtToken });
});

// 카카오 로그인
const kakaoLogin = catchAsync(async (req, res) => {
  const kakaoToken = req.headers.authorization;

  if (!kakaoToken) detectError("NOT_ACCESS_TOKEN", 401);

  const kakao_accessToken = await userService.kakaoLogin(kakaoToken);

  return res.status(200).json({ accessToken: kakao_accessToken });
});

// 네이버 로그인
const naverLogin = catchAsync(async (req, res) => {
  const naverToken = req.headers.authorization;

  if (!naverToken) detectError("NOT_ACCESS_TOKEN", 401);

  const naver_accessToken = await userService.naverLogin(naverToken);

  return res.status(200).json({ accessToken: naver_accessToken });
});

// 탈퇴
const deleteUser = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  await userService.deleteUser(token);

  return res.status(201).json({ message: "USER_DELETED!" });
});

module.exports = {
  signUp,
  signIn,
  kakaoLogin,
  naverLogin,
  deleteUser,
};
