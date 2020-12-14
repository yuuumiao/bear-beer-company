var express = require("express");
var router = express.Router();

// GET to show all the products
router.get("/", (req, res, next) => {
  res.render("products");
});

// GET to manage all the products
router.get("/products-manage", (req, res, next) => {
  res.render("products-manage");
});

// GET to add new the products
router.get("/product-add", (req, res, next) => {
  res.render("product-add");
});

// GET to post products
router.post("/product-add", (req, res, next) => {
  res.redirect("/dashboard");
});

// GET to edit the products
router.get("/product-edit/:id", (req, res, next) => {
  res.render("product-edit");
});

// GET to post the edit products
router.post("/product-edit/:id", (req, res, next) => {
  res.redirect("/dashboard");
});

// GET to delet the product
router.get("/delete/:id", (req, res, next) => {
  res.redirect("/dashboard");
});

module.exports = router;
