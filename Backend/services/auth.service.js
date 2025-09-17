// 인증 서비스: 비즈니스 로직(간단 버전 - 평문 저장/비교)
const userRepo = require('../repositories/user.repo');

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

async function signup({ email, password, name }) {
  const normalizedEmail = normalizeEmail(email);
  const exists = await userRepo.findByEmail(normalizedEmail);
  if (exists) {
    const err = new Error('이미 가입된 이메일입니다.');
    err.status = 409;
    throw err;
  }
  const created = await userRepo.createUser({ email: normalizedEmail, name: String(name || '').trim(), passwordPlain: String(password || '') });
  if (!created) {
    const err = new Error('사용자 생성에 실패했습니다.');
    err.status = 500;
    throw err;
  }
  return {
    user: { id: String(created.id), email: created.email, name: created.name, createdAt: created.createdAt },
    accessToken: '',
  };
}

async function login({ email, password }) {
  const normalizedEmail = normalizeEmail(email);
  const user = await userRepo.findByEmail(normalizedEmail);
  if (!user) {
    const err = new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
    err.status = 401;
    throw err;
  }
  const ok = String(password || '') === String(user.passwordPlain || '');
  if (!ok) {
    const err = new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
    err.status = 401;
    throw err;
  }
  return {
    user: { id: String(user.id), email: user.email, name: user.name, createdAt: user.createdAt },
    accessToken: '',
  };
}

async function getMe() {
  // 평문/무인증 모드에서는 미사용
  return null;
}

module.exports = { signup, login, getMe };


