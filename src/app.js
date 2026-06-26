const express = require("express");
const cors = require("cors");
const { router, redirect } = require("./routes/url.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);
app.get("/:code", redirect); // must be after /api routes

app.use(errorHandler);

module.exports = app;
