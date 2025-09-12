// 인증 서비스: 비즈니스 로직(암호화, 토큰 발급, 조회)을 담당한다.
const bcrypt = require('bcryptjs');
const userRepo = require('../repositories/user.repo');
const { signAccessToken } = require('../utils/jwt');

async function signup({ email, password, name }) {
  const exists = userRepo.findByEmail(email);
  if (exists) {
    const err = new Error('이미 가입된 이메일입니다.');
    err.status = 409;
    throw err;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const created = userRepo.createUser({ email, name, passwordHash });
  if (!created) {
    const err = new Error('사용자 생성에 실패했습니다.');
    err.status = 500;
    throw err;
  }
  const token = signAccessToken({ sub: created.id, email: created.email });
  return {
    user: { id: created.id, email: created.email, name: created.name, createdAt: created.createdAt },
    accessToken: token,
  };
}

async function login({ email, password }) {
  const user = userRepo.findByEmail(email);
  if (!user) {
    const err = new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
    err.status = 401;
    throw err;
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    const err = new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
    err.status = 401;
    throw err;
  }
  const token = signAccessToken({ sub: user.id, email: user.email });
  return {
    user: { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt },
    accessToken: token,
  };
}

async function getMe(userId) {
  const user = userRepo.findById(userId);
  if (!user) return null;
  return { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt };
}

module.exports = { signup, login, getMe };


