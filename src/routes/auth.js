const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await prisma.admins.findUnique({
      where: { username: username },
    });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      const e = new Error("wrong username or password");
      e.status = 403;
      return next(e);
    }
    delete user.password;
    req.session.user = user;
    res.send(user);
  } catch (e) {
    next(new Error(e));
  }
});

router.post("/logout", async function (req, res, next) {
  try {
    delete req.session.user;
    res.status(200).end();
  } catch (e) {
    next(new Error(e));
  }
});

module.exports = router;
