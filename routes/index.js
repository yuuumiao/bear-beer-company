const express = require('express');
const router = express.Router();
const BeerModel = require("./../models/Product");
const UserModel = require("./../models/User");
const CartModel = require("./../models/Cart");


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
  const product = await BeerModel.findById(req.params.id).populate({ path: "userId", model: "users" })
  console.log(product)
  res.render("one-product", { product, scripts: ["addToCart"]})
})

//Get shopping cart page
router.get("/shoppingcart", async(req, res, next) => {
  // const carts = await CartModel.find().populate({path:'items', populate:{ path:}})
  const carts = await CartModel.find().populate("items.productId");
  console.log(carts)
  res.render("shopping-cart");
})

//GET Checkout
router.get("/checkout", async(req, res, next) => {
  res.render("checkout");
})

// -------move to ./api/api.shoppingcart 
//get add product id to cart
router.get("/shoppingcart/:id", async (req, res, next) => {
  res.json(await CartModel.find());
})
//post add product id to cart
router.post("/shoppingcart/:id", async (req, res, next) => {
  console.log(req.body)
  if ((await CartModel.find()).length == 0) {
    res.json(await CartModel.create({ items: [req.body] }));
  } else {
    res.json(await CartModel.updateOne({ $push: { items: req.body } }));
  }

});
// delete product in shopping cart
router.get("/shoppingcart/delete/:id", async (req, res, next) => {
  try {
    console.log("here: ", req.params.id)
    await CartModel.updateOne({ $pull: { items: {_id: req.params.id} } });
    res.redirect("/shoppingcart");
  } catch (err) {
    next(err)
  }
});



module.exports = router;


