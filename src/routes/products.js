const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const skip = parseInt(req.query._skip) || undefined;
    const take = parseInt(req.query._take) || undefined;
    const order = req.query._order || undefined;
    const sort = req?.query?._sort?.toLowerCase() || undefined;
    const ids = req.query?.ids && JSON.parse(req.query.ids);
    const filter = req.query?.filter && JSON.parse(req.query.filter);
    const data = await prisma.product.findMany({
      skip,
      take,
      where: { id: ids ? { in: ids } : undefined, ...filter },
      orderBy: order ? { [order]: sort } : undefined,
    });
    const total = await prisma.product.count({
      where: { id: ids ? { in: ids } : undefined, ...filter },
    });
    res.send({ data, total });
  } catch (e) {
    next(new Error(e));
  }
});
router.post("/", async function (req, res, next) {
  try {
    const body = req.body;
    body.password = bcrypt.hashSync(body.password, 10);
    const data = await prisma.product.create({ data: body });
    res.send(data);
  } catch (e) {
    next(new Error(e));
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const results = await prisma.product.findUnique({
      where: { id: req.params.id},
    });
    res.send(results);
  } catch (e) {
    next(new Error(e));
  }
});
router.delete("/:id", async function (req, res, next) {
  try {
    const data = await prisma.product.delete({
      where: { id: req.params.id },
    });
    res.send(data);
  } catch (e) {
    next(new Error(e));
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    const results = await prisma.product.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.send(results);
  } catch (e) {
    next(new Error(e));
  }
});

module.exports = router;
