module.exports = {
  USER_SERVICE:         process.env.USER_SERVICE_URL         || 'http://localhost:3001',
  ORDER_SERVICE:        process.env.ORDER_SERVICE_URL        || 'http://localhost:3002',
  PAYMENT_SERVICE:      process.env.PAYMENT_SERVICE_URL      || 'http://localhost:3003',
  NOTIFICATION_SERVICE: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3004',
  INVENTORY_SERVICE:    process.env.INVENTORY_SERVICE_URL    || 'http://localhost:3005',
};