const { generateToken } = require("../services/auth.service");

const googleCallback = (req, res) => {
  const token = generateToken(req.user);
  res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
};

const getMe = (req, res) => {
  res.json(req.user);
};

const logout = (req, res) => {
  res.json({ message: "Logged out" });
};

module.exports = { googleCallback, getMe, logout };
