module.exports = function timeoutMiddleware(req, res, next) {
  const TIMEOUT_MS = 10000; // 10 seconds

  const timer = setTimeout(() => {
    if (!res.headersSent) {
      res.status(504).json({ error: 'Gateway timeout — upstream service took too long' });
    }
  }, TIMEOUT_MS);

  // Clear the timer if response finishes normally
  res.on('finish', () => clearTimeout(timer));
  res.on('close',  () => clearTimeout(timer));

  next();
};