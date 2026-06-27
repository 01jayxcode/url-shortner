const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return next();
  try {
    req.user = jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
  } catch {
    /* ignore */
  }
  next();
};

module.exports = { requireAuth, requireAdmin, optionalAuth };
