const express        = require('express');
const dotenv         = require('dotenv');
const auth           = require('./middleware/auth');
const rateLimiter    = require('./middleware/rateLimiter');
const timeout        = require('./middleware/timeout');
const registerRoutes = require('./routes/proxy');

dotenv.config();

const app = express();

app.use(express.json());

// --- Health check registered FIRST before any middleware ---
// This means it bypasses rate limiting, timeout, and auth entirely.
// Kubernetes liveness and readiness probes hit this endpoint to know
// if the pod is healthy. It must always return 200 with no token required.
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'api-gateway',
    timestamp: new Date().toISOString()
  });
});

// --- Global middleware ---
// These run on every request EXCEPT /health which was already handled above.
// Order matters:
// 1. Rate limiter — rejects if IP exceeded 100 req/15min
// 2. Timeout     — starts a 10s countdown, returns 504 if upstream is slow
// 3. Auth        — validates JWT token, rejects with 401 if invalid
app.use(rateLimiter);
app.use(timeout);
app.use(auth);

// --- Proxy routes ---
// Registered after auth so all of them are protected by default
registerRoutes(app);

module.exports = app;