const rateLimit = require("express-rate-limit");

const shortenLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 requests per 15 min
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again after 15 minutes" },
});

const globalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute globally
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests" },
});

module.exports = { shortenLimiter, globalLimiter };
