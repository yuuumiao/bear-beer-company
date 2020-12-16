var express = require("express");
var router = express.Router();
const BeerModel = require("./../models/Product");
const CartModel = require("./../models/Cart");
const fileUploader = require("./../configs/cloudinary")

// GET to show all the products
router.get("/", async (req, res, next) => {
  const products = await BeerModel.find();
  res.render("dashboard/products", { products, scripts: ["products"] });
});

// GET to manage all the products
router.get("/products-manage", async (req, res, next) => {
  try {
    const products = await BeerModel.find();
    res.render("dashboard/products-manage", { products, scripts: ["products-manage"] });
  } catch (err) {
    next(err);
  }
});

// GET to add new the products
router.get("/product-add", (req, res, next) => {
  try {
    res.render("dashboard/product-add");
  } catch (err) {
    next(err);
  }
});

// GET to post products
router.post("/product-add", fileUploader.single('image'), async (req, res, next) => {
  const newBeer = { ...req.body };
  if (!req.file) newBeer.image = undefined;
  else newBeer.image = req.file.path;
  try {
    await BeerModel.create(newBeer);
    res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
});

// GET to edit the products
router.get("/product-edit/:id", async (req, res, next) => {
  const product = await BeerModel.findById(req.params.id);
  // console.log(product)
  res.render("dashboard/product-edit", { product });
});

// GET to post the edit products
router.post("/product-edit/:id", fileUploader.single('image'), async (req, res, next) => {
  const newBeer = { ...req.body };
  if (req.file) {newBeer.image = req.file.path};
  try {
    await BeerModel.findByIdAndUpdate(req.params.id, newBeer, { new: true });
    res.redirect("/dashboard/products-manage");
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
