var express = require("express");
var router = express.Router();
const BeerModel = require("./../models/Product");
const CartModel = require("./../models/Cart");

// GET to show all the products
router.get("/", async (req, res, next) => {
  const products = await BeerModel.find();
  res.render("dashboard/products", { products });
});

// GET to manage all the products
router.get("/products-manage", async (req, res, next) => {
  try {
    const products = await BeerModel.find();
    res.render("dashboard/products-manage", { products });
  } catch (err) {
    next(err);
  }
});

// GET to add new the products
router.get("/product-add", (req, res, next) => {
  try {
    //const carts = await CartModel.find();
    res.render("dashboard/product-add");
  } catch (err) {
    next(err);
  }
});

// GET to post products
router.post("/product-add", async (req, res, next) => {
  const newBeer = { ...req.body };
  console.log(req.body);

  try {
    await BeerModel.create(newBeer);
    res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
});

// GET to edit the products
router.get("/product-edit/:id", async (req, res, next) => {
  const beer = await BeerModel.findById(req.params.id);
  //const carts = await CartModel.find();
  //console.log(">>>>>", beer);
  res.render("dashboard/product-edit", { beer });
});

// GET to post the edit products
router.post("/product-edit/:id", async (req, res, next) => {
  try {
    const beer = req.body;
    //console.log(beer);
    await BeerModel.findByIdAndUpdate(req.params.id, beer);
    res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
});

// GET to delete the product
router.get("/product-delete/:id", async (req, res, next) => {
  try {
    console.log("beeer");
    await BeerModel.findByIdAndRemove(req.params.id);
    res.redirect("/dashboard/products-manage");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
