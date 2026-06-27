const express = require("express");
const router = express.Router();
const { shorten, redirect, stats } = require("../controllers/url.controller");
const { requireAuth } = require("../middlewares/auth.middleware");

router.post("/shorten", shorten);
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
