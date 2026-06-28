const { nanoid } = require("nanoid");
const {
  createShortUrl,
  getUrlByCode,
  incrementClicks,
  getStats,
} = require("../services/url.service");
const shorten = async (req, res, next) => {
  try {
    const { long_url, uid } = req.body;
    if (!long_url)
      return res.status(400).json({ error: "long_url is required" });
    const short_code = nanoid(7);
    const user_id = req.user?.user_id || null;
    await createShortUrl(short_code, long_url, uid || null, user_id);
    res.status(201).json({
      short_code,
      short_url: `${process.env.BASE_URL}/${short_code}`,
      long_url,
    });
  } catch (err) {
    next(err);
  }
};

const redirect = async (req, res, next) => {
  try {
    const url = await getUrlByCode(req.params.code);
    if (!url)
      return res
        .status(404)
        .sendFile(path.join(__dirname, "../../public/404.html"));
    incrementClicks(req.params.code); // fire and forget — no await, non-blocking
    res.redirect(url.long_url);
  } catch (err) {
    next(err);
  }
};

const stats = async (req, res, next) => {
  try {
    const data = await getStats(req.params.code);
    if (!data) return res.status(404).json({ error: "URL not found" });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = { shorten, redirect, stats };
