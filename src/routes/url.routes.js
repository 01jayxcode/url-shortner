const express = require("express");
const router = express.Router();
const { shorten, redirect, stats } = require("../controllers/url.controller");
const { requireAuth } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate");
const { shortenSchema } = require("../schemas/url.schema");
const { shortenLimiter } = require("../middlewares/rateLimiter");

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
router.post("/shorten", shortenLimiter, validate(shortenSchema), shorten);
router.get("/stats/:code", stats);
router.get("/my-links", requireAuth, async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("urls")
      .select("*")
      .eq("user_id", req.user.user_id)
      .order("created_at", { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = { router, redirect };
