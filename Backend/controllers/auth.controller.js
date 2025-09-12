// 인증 컨트롤러: 요청을 검증하고 서비스 계층을 호출하여 응답을 반환한다.
const authService = require('../services/auth.service');

async function signup(req, res, next) {
  try {
    const { email, password, name } = req.body || {};
    if (!email || !password || !name) {
      return res.status(400).json({ success: false, error: { message: 'email, password, name 필수' } });
    }
    const result = await authService.signup({ email, password, name });
    return res.status(201).json({ success: true, data: result });
  } catch (err) {
    return next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, error: { message: 'email, password 필수' } });
    }
    const result = await authService.login({ email, password });
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    return next(err);
  }
}

async function me(req, res, next) {
  try {
    const result = await authService.getMe(req.userId);
    if (!result) {
      return res.status(404).json({ success: false, error: { message: '사용자를 찾을 수 없습니다.' } });
    }
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    return next(err);
  }
}

module.exports = { signup, login, me };


