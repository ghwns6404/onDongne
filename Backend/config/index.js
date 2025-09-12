const dotenv = require('dotenv');
dotenv.config();

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:19006';

const corsOptions = {
  origin: CLIENT_ORIGIN,
  credentials: true,
};

module.exports = {
  corsOptions,
};


