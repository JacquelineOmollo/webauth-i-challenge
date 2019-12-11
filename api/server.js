const express = require("express");

const apiRouter = require("./api-router");
const configureMiddleware = require("./configure-middleware");
const userRouter = require("../users/users-routers");
const server = express();

configureMiddleware(server);
// server.use("/api/user", userRouter);
server.use("/", userRouter);
server.use("/api", apiRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
