const express = require('express');
const router = express.Router();
const BeerModel = require("./../models/Product");
const User = require("./../models/User");


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

// GET products page to show all products
router.get("/collection", async (req, res, next) => {
  try {
    const products = await BeerModel.find();
    res.render("dashboard/products", { products, scripts: ["products"] })
  } catch (err) {
    next(err)
  }
});

//Get item page
router.get("/collection/:id", async (req, res, next) => {
  const product = await BeerModel.findById(req.params.id).populate({path: "userId", model:"User"})
  console.log(product)
  res.render("one-product", { product })
})

module.exports = router;


