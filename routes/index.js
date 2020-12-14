const express = require('express');
const router = express.Router();
const ProductModel = require("./../models/Product");


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

// GET products page to show all products
router.get("/collection", async (req, res, next) => {
  try {
    const products = await ProductModel.find();
    res.render("dashboard/products", { products })
  } catch (err) {
    next(err)
  }
});

//Get item page
router.get("/collection/:id", async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);
  res.render("one-product", { product })
})

module.exports = router;



