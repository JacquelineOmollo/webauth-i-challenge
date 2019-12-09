const router = require("express").Router();

const Users = require("../users/users-model");
const authRequired = require("../auth/auth-required-middleware");

router.get("/", authRequired, (req, res) => {
  Users.find()
    .then(user => {
      res.json(users);
    })
    .catch(error => res.send(error));
});

module.exports = router;
