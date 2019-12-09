const bcrypt = require("bcryptjs");
const Users = require("../users/users-model");

module.exports = (req, res, next) => {
  if (req.session.loggedin && req.session.loggedIn === true) {
    next();
  } else {
    res.status(400).json({ message: "please provide credentials" });
  }
};
