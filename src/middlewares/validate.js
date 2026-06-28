const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const firstError = result.error.issues[0]; // use .issues not .errors
    return res.status(400).json({
      error: firstError?.message || "Validation failed",
    });
  }
  req.body = result.data;
  next();
};

module.exports = validate;
