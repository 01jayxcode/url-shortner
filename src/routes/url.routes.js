const express = require("express");
const router = express.Router();
const { shorten, redirect, stats } = require("../controllers/url.controller");

router.post("/shorten", shorten);
router.get("/stats/:code", stats);

module.exports = { router, redirect };
