const express = require('express');
const router = express.Router();
const BeerModel = require("./../models/Product");


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

// GET products page to show all products
router.get("/collection", async (req, res, next) => {
  try {
    const getProducts = await BeerModel.find()
    const products = getProducts .sort((x, y) => +new Date(x.updatedAt) - +new Date(y.updatedAt));
    res.render("dashboard/products", { products })
  } catch (err) {
    next(err)
  }
});

//Get item page
router.get("/collection/:id", async (req, res, next) => {
  const product = await BeerModel.findById(req.params.id);
  res.render("one-product", { product })
})

module.exports = router;


