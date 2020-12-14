var express = require("express");
var router = express.Router();
const BearModel = require("./../models/Product");
const CartModel = require("./../models/Cart");

// GET to show all the products
router.get("/", (req, res, next) => {
  res.render("dashboard/products");
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
router.get("/product-add", async (req, res, next) => {
  try {
    const carts = await CartModel.find();
    res.render("dashboard/product-add", { carts });
  } catch (err) {
    next(err)
  }
});

// GET to post products
router.post("/product-add", async (req, res, next) => {
  const newBear = { ...req.body };
  try {
    await BearModel.create(newBear);
    res.redirect("/dashboard");
  } catch (err) {
    next(err)
  }
  
});

// GET to edit the products
router.get("/product-edit/:id", async (req, res, next) => {
  const bear = await BearModel.findById(req.params.id);
  const carts = await CartModel.find();
  console.log(bear);
  res.render("dashboard/product-edit", {bear, carts});
});

// GET to post the edit products
router.post("/product-edit/:id", async (req, res, next) => {
  try {
    const bear = req.body
    await BearModel.findByIdAndUpdate(req.params.id, sneaker);
    res.redirect("/dashboard")
  } catch (err) {
    next(err)
  }
});

// GET to delete the product
router.get("/delete/:id", (req, res, next) => {
  try {
    await BearModel.findByIdAndRemove(req.params.id);
    res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
