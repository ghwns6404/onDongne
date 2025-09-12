// In-memory user repository for early development
const users = new Map(); // key: email, value: { id, email, name, passwordHash, createdAt }

let nextId = 1;

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

function findByEmail(email) {
  const user = users.get(email);
  return user ? { ...user } : null;
}

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


