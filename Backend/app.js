const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const { corsOptions } = require('./config');
const authRouter = require('./routes/auth.route');
const { errorHandler, notFoundHandler } = require('./middlewares/errorHandler');

const app = express();

// Security & common middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Basic rate limiting for API
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ ok: true, service: 'onDongne-backend' });
});

// Routes
app.use('/api/auth', authRouter);

// 404
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

module.exports = app;


