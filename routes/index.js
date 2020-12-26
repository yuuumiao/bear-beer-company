const express = require('express');
const router = express.Router();
const BeerModel = require("./../models/Product");
const UserModel = require("./../models/User");
const CartModel = require("./../models/Cart");


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {titlePage:"Home"});
});

// GET products page to show all products
router.get("/collection", async (req, res, next) => {
  try {
    const products = await BeerModel.find();
    res.render("dashboard/products", { products, scripts: ["products"], titlePage:"Products" })
  } catch (err) {
    next(err)
  }
});

//Get item page
router.get("/collection/:id", async (req, res, next) => {
  try{
    const product = await BeerModel.findById(req.params.id).populate("reviews.userId");
    res.render("one-product", { product, scripts: ["addToCart", "wishlist"], titlePage:"Product" })
  }catch(err){
    next(err)
  }
 
})

module.exports = router;


