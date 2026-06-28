const express = require("express");
const cors = require("cors");
const passport = require("./config/passport");
const { router: urlRouter, redirect } = require("./routes/url.routes");
const authRouter = require("./routes/auth.routes");
const errorHandler = require("./middlewares/errorHandler");
const adminRouter = require("./routes/admin.routes");
const { optionalAuth } = require("./middlewares/auth.middleware");
const { shortenLimiter, globalLimiter } = require("./middlewares/rateLimiter");

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(globalLimiter);
app.use(passport.initialize());

app.use("/api", optionalAuth, urlRouter);

app.use("/api", urlRouter);
app.use("/auth", authRouter);
app.get("/:code", redirect);

app.use("/admin", adminRouter);
app.use(errorHandler);

module.exports = app;
