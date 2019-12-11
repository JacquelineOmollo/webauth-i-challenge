const router = require("express").Router();

const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-routers");

router.use("/auth", authRouter);
router.use("/users", usersRouter);

router.get("/", (req, res) => {
  res.json({ api: "It working. Yaaay" });
});
module.exports = router;
