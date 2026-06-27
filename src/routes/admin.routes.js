const express = require("express");
const router = express.Router();
const { requireAuth, requireAdmin } = require("../middlewares/auth.middleware");
const {
  globalStats,
  allLinks,
  allUsers,
  removeLInk,
} = require("../controllers/admin.controller");

router.use(requireAuth, requireAdmin); // all admin routes protected

router.get("/stats", globalStats);
router.get("/links", allLinks);
router.get("/users", allUsers);
router.delete("/links/:code", removeLInk);

module.exports = router;
