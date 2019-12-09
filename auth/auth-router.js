const bcrypt = require("bcryptjs");
const router = require("express").Router();

const Users = require("../users/users-model");

// const authorize = require("../auth/auth-required-middleware");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log("the error", error);
      res.status(500).json(error);
    });
});

// router.post("/login", (req, res) => {
//   let { username } = req.header;
//   res.status(200).json({ message: `Welcome ${username}!` });
// });
router.post("/login", (req, res) => {
  let { username, password } = req.body;
  req.session.loggedIn = false;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.loggedIn = true;
        res
          .status(200)
          .json({ message: `Welcome ${user.username}! have a good time` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/logout", (req, res) => {
  if (req.session) {
    console.log(req.session);

    req.session.destroy(err => {
      if (err) {
        res
          .status(400)
          .send("queue the groundhog day trope... you can never leave...");
      } else {
        res.send("you made it out! good job!");
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
