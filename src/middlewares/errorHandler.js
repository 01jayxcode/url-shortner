const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);

  if (err.name === "ZodError") {
    return res
      .status(400)
      .json({ error: err.errors?.[0]?.message || "Validation failed" });
  }

  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
