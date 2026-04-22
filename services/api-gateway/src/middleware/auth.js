const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
  // Skip auth for login and register endpoints
  const openPaths = ['/api/users/login', '/api/users/register'];
  if (openPaths.includes(req.path)) return next();

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};