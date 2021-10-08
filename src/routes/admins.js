const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async function (req, res) {
  const results = await prisma.user.findMany();
  res.send(results);
});

router.get("/:id", async function (req, res) {
  const results = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.send(results);
});

router.put("/:id", async function (req, res) {
  const results = await prisma.user.update({
    where: { id: parseInt(req.params.id) },
    data: req.body,
  });
  res.send(results);
});

module.exports = router;
