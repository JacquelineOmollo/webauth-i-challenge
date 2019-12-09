const express = require("express");

const apiRouter = require("./api-router");
const configureMiddleware = require("./configure-middleware");
const userRouter = require("../users/users-routers");
const server = express();

configureMiddleware(server);
server.use("/api", userRouter);
server.use("/api", apiRouter);

module.exports = server;
