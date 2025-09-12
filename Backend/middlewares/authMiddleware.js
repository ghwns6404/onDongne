// 인증 미들웨어: Authorization 헤더의 Bearer 토큰을 검증한다.
const { verifyAccessToken } = require('../utils/jwt');

function authMiddleware(req, res, next) {
  const header = req.headers['authorization'] || '';
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ success: false, error: { message: '토큰이 필요합니다.' } });
  }
  try {
    const payload = verifyAccessToken(token);
    req.userId = payload.sub;
    return next();
  } catch (e) {
    return res.status(401).json({ success: false, error: { message: '유효하지 않은 토큰입니다.' } });
  }
}

module.exports = { authMiddleware };

