const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async function (req, res, next) {
  try {
    const { email, username, password } = req.body;
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: {
              equals: email,
            },
          },
          {
            username: {
              equals: username,
            },
          },
        ],
        password: {
          equals: password,
        },
      },
    });
    if (user !== null) {
      delete user.password
      req.session.user = user;
      res.send(user);
    } else res.status(403).send("Invalid credentials");
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
