// 사용자 저장소: MySQL 기반 구현
const mysql = require('mysql2/promise');
const { mysqlConfig } = require('../config');

let pool;

function getPool() {
  if (pool) return pool;
  if (mysqlConfig.url) {
    pool = mysql.createPool({
      uri: mysqlConfig.url,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  } else {
    pool = mysql.createPool({
      host: mysqlConfig.host,
      port: mysqlConfig.port,
      user: mysqlConfig.user,
      password: mysqlConfig.password,
      database: mysqlConfig.database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

async function createUser({ email, name, passwordPlain }) {
  const sql = 'INSERT INTO `USER` (email, password, name, `CreatedAt`) VALUES (?, ?, ?, NOW())';
  const [result] = await getPool().execute(sql, [email, passwordPlain, name]);
  const id = result.insertId;
  const [rows] = await getPool().execute('SELECT id, email, name, `CreatedAt` FROM `USER` WHERE id = ?', [id]);
  const user = rows && rows[0] ? rows[0] : null;
  return user ? { id: String(user.id), email: user.email, name: user.name, createdAt: user.CreatedAt } : null;
}

async function findByEmail(email) {
  const normalized = String(email || '').trim().toLowerCase();
  const [rows] = await getPool().execute('SELECT id, email, name, password, `CreatedAt` FROM `USER` WHERE LOWER(email) = ? LIMIT 1', [normalized]);
  if (!rows || rows.length === 0) return null;
  const row = rows[0];
  const passwordValue = typeof row.password === 'string' ? row.password : (row.password && row.password.toString ? row.password.toString() : '');
  return {
    id: String(row.id),
    email: row.email,
    name: row.name,
    passwordPlain: passwordValue,
    createdAt: row.CreatedAt || null,
  };
}

async function findById(id) {
  const [rows] = await getPool().execute('SELECT id, email, name, `CreatedAt` FROM `USER` WHERE id = ? LIMIT 1', [id]);
  if (!rows || rows.length === 0) return null;
  const row = rows[0];
  return {
    id: String(row.id),
    email: row.email,
    name: row.name,
    createdAt: row.CreatedAt || null,
  };
}

module.exports = {
  createUser,
  findByEmail,
  findById,
};


