const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const sessionStorage = {
  name: "thecookie",
  secret: "cookiesaregoodtoeat",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false, //true in production
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false, //GDPR laws against setting. customer had to accept the cookies

  store: new knexSessionStore({
    knex: require("../database/dbConfig.js"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionStorage));
};
