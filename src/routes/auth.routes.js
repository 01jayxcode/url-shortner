const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const {
  googleCallback,
  getMe,
  logout,
} = require("../controllers/auth.controller");
const { requireAuth } = require("../middlewares/auth.middleware");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=true`,
  }),
  googleCallback,
);

router.get("/me", requireAuth, getMe);
router.post("/logout", requireAuth, logout);

module.exports = router;
