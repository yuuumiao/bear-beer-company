var express = require("express");
var router = express.Router();

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
router.get("/product-add", (req, res, next) => {
  res.render("dashboard/product-add");
});

// GET to post products
router.post("/product-add", (req, res, next) => {
  res.redirect("/dashboard");
});

// GET to edit the products
router.get("/product-edit/:id", (req, res, next) => {
  res.render("dashboard/product-edit");
});

// GET to post the edit products
router.post("/product-edit/:id", (req, res, next) => {
  res.redirect("/dashboard");
});

// GET to delete the product
router.get("/delete/:id", (req, res, next) => {
  res.redirect("/dashboard");
});

module.exports = router;
