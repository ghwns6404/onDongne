// 초기 개발 단계용 인메모리 사용자 저장소
// 아직 디비가 없어서 Map에 저장함
// 그래서 웹이 꺼졌다 켜지면 기존 회원정보 날아감

const users = new Map(); // 키: email, 값: { id, email, name, passwordHash, createdAt }

let nextId = 1;

// 사용자 생성: 이메일이 중복이면 null 반환, 아니면 새 사용자 생성
function createUser({ email, name, passwordHash }) {
  if (users.has(email)) return null;
  const user = {
    id: String(nextId++),
    email,
    name,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  users.set(email, user);
  return { ...user };
}

// 이메일로 사용자 조회
function findByEmail(email) {
  const user = users.get(email);
  return user ? { ...user } : null;
}

// ID로 사용자 조회
function findById(id) {
  for (const user of users.values()) {
    if (user.id === id) return { ...user };
  }
  return null;
}

module.exports = {
  createUser,
  findByEmail,
  findById,
};


