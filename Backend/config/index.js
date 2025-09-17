const dotenv = require('dotenv');
dotenv.config();

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:19006';
const CLIENT_ORIGINS = process.env.CLIENT_ORIGINS || '';
const allowedOrigins = [
  ...CLIENT_ORIGIN.split(',').map((s) => s.trim()).filter(Boolean),
  ...CLIENT_ORIGINS.split(',').map((s) => s.trim()).filter(Boolean),
];

const corsOptions = {
  origin: function (origin, callback) {
    // 모바일 앱(Origin 없음) 허용, 그리고 허용 리스트에 있으면 통과
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true,
};

// MySQL connection settings (Railway)
const mysqlConfig = {
  url: process.env.MYSQL_PUBLIC_URL || process.env.MYSQL_URL || '',
  host: process.env.MYSQLHOST || 'localhost',
  port: Number(process.env.MYSQLPORT || 3306),
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || '',
  database: process.env.MYSQL_DATABASE || process.env.MYSQLDATABASE || 'railway',
};

module.exports = {
  corsOptions,
  mysqlConfig,
};


