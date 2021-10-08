const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

function flatTrans(data) {
  const fields = ["title", "slug", "description"];
  if (Array.isArray(data)) return data.map((e) => flatTrans(e));
  const result = { ...data, post_category_translations: undefined };
  for (let trans of data.post_category_translations) {
    for (let field of fields) {
      if (!result[field]) result[field] = {};
      result[field][trans.locale] = trans[field];
    }
  }
  return result;
}

router.get("/", async function (req, res, next) {
  try {
    const skip = parseInt(req.query._skip) || undefined;
    const take = parseInt(req.query._take) || undefined;
    const order = req.query._order || undefined;
    const sort = req?.query?._sort?.toLowerCase() || undefined;
    const ids = req.query?.ids && JSON.parse(req.query.ids);
    const filter = req.query?.filter && JSON.parse(req.query.filter);
    let data = await prisma.post_categories.findMany({
      skip,
      take,
      where: { id: ids ? { in: ids } : undefined, ...filter },
      orderBy: order ? { [order]: sort } : undefined,
      include: { post_category_translations: true },
    });
    data = flatTrans(data);
    const total = await prisma.post_categories.count({
      where: { id: ids ? { in: ids } : undefined, ...filter },
    });
    res.send({ data, total });
  } catch (e) {
    next(new Error(e));
  }
});
router.post("/", async function (req, res, next) {
  try {
    const data = await prisma.post_categories.create({ data: req.body });
    res.send(data);
  } catch (e) {
    next(new Error(e));
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    let results = await prisma.post_categories.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { post_category_translations: true },
    });
    results = flatTrans(results);
    res.send(results);
  } catch (e) {
    next(new Error(e));
  }
});
router.delete("/:id", async function (req, res, next) {
  try {
    const data = await prisma.post_categories.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.send(data);
  } catch (e) {
    next(new Error(e));
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    const results = await prisma.post_categories.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.send(results);
  } catch (e) {
    next(new Error(e));
  }
});

module.exports = router;
