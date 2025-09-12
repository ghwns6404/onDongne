function notFoundHandler(req, res, next) {
  res.status(404).json({ success: false, error: { message: 'Not Found' } });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const details = err.details || undefined;
  if (process.env.NODE_ENV !== 'test') {
    // Basic logging; can be replaced with winston/pino later
    console.error('[error]', status, message, details || '');
  }
  res.status(status).json({ success: false, error: { message, details } });
}

module.exports = { notFoundHandler, errorHandler };


