const {
  getGlobalStats,
  getAllLinks,
  getAllUsers,
  deleteLink,
} = require("../services/admin.service");

const globalStats = async (req, res, next) => {
  try {
    const data = await getGlobalStats();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const allLinks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const data = await getAllLinks(page, limit);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const allUsers = async (req, res, next) => {
  try {
    const data = await getAllUsers();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const removeLInk = async (req, res, next) => {
  try {
    const data = await deleteLink(req.params.code);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = { globalStats, allLinks, allUsers, removeLInk };
