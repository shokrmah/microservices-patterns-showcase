const { createProxyMiddleware } = require('http-proxy-middleware');
const services = require('../config/services');

module.exports = function registerRoutes(app) {

  // User Service
  app.use('/api/users', createProxyMiddleware({
    target: services.USER_SERVICE,
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        res.status(502).json({ error: 'User service unavailable' });
      }
    }
  }));

  // Order Service
  app.use('/api/orders', createProxyMiddleware({
    target: services.ORDER_SERVICE,
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        res.status(502).json({ error: 'Order service unavailable' });
      }
    }
  }));

  // Payment Service
  app.use('/api/payments', createProxyMiddleware({
    target: services.PAYMENT_SERVICE,
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        res.status(502).json({ error: 'Payment service unavailable' });
      }
    }
  }));

  // Inventory Service
  app.use('/api/inventory', createProxyMiddleware({
    target: services.INVENTORY_SERVICE,
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        res.status(502).json({ error: 'Inventory service unavailable' });
      }
    }
  }));

};