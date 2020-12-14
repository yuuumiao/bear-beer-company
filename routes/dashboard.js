var express = require("express");
var router = express.Router();

router.get("/dashbourd", (req, res, next) => {
  res.render("products");
});

router.get("/products-manage", (req, res, next) => {
  res.render("products");
});

router.get("/product-add", (req, res, next) => {
  res.render("products");
});

router.post("/product-add", (req, res, next) => {
  res.redirect("/dashboard");
});

router.get("/product-edit/:id", (req, res, next) => {
  res.render("products");
});
router.post("/product-edit/:id", (req, res, next) => {
  res.redirect("/dashboard");
});

module.exports = router;
