const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();
const translationHelper = require("../lib/translationHelper");
const TRANS_FIELDS = ["title", "slug", "description"];

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
    data = translationHelper.flatTrans({
      data,
      trans_field: "post_category_translations",
      trans_fields: TRANS_FIELDS,
    });
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
    const [body, post_categories_translates] = translationHelper.splitTrans({
      data: req.body,
      trans_fields: TRANS_FIELDS,
    });
    let result = await prisma.post_categories.create({
      data: {
        ...body,
        post_category_translations: {
          createMany: { data: post_categories_translates },
        },
      },
      include: { post_category_translations: true },
    });
    results = translationHelper.flatTrans({
      data: results,
      trans_field: "post_category_translations",
      trans_fields: TRANS_FIELDS,
    });
    res.send(result);
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
    results = translationHelper.flatTrans({
      data: results,
      trans_field: "post_category_translations",
      trans_fields: TRANS_FIELDS,
    });
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
    const id = parseInt(req.params.id);
    const [body, post_categories_translates] = translationHelper.splitTrans({
      data: req.body,
      trans_fields: TRANS_FIELDS,
    });
    const result = await prisma.post_categories.update({
      where: { id },
      data: {
        ...body,
        post_category_translations: {
          upsert: post_categories_translates.map((item) => ({
            create: item,
            update: item,
            where: {
              post_category_id_locale: {
                locale: item.locale,
                post_category_id: id,
              },
            },
          })),
        },
      },
    });
    res.send(result);
  } catch (e) {
    next(new Error(e));
  }
});

module.exports = router;
