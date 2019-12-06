const express = require("express");

const apiRouter = require("./api-router.js");
const configureMiddleware = require("./configure-middleware.js");
const useRouter = require("../users/users-routers");
const server = express();

configureMiddleware(server);
server.use("/", useRouter);
server.use("/api", apiRouter);

module.exports = server;
