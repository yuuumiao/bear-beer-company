var express = require('express');
var router = express.Router();
const UserModel = require("./../models/User");
const BeerModel = require("./../models/Product");
const { db } = require('./../models/Product');

/* GET users listing. */


/////// PREFIX:  /user //////////


// GET for user/profile with req.session.currentUser
router.get("/profile", (req,res,next) => {

  const user = req.session.currentUser
  console.log("user", user);

  res.render('profile', {user : req.session.currentUser, scripts: ["address"]})
})


// GET for user/profile with req.session.currentUser
router.post("/profile", async(req,res,next) => {

  const update = await UserModel.findByIdAndUpdate(req.session.currentUser._id, req.body, {new: true})
  req.session.currentUser = update;

  res.render('profile', {user : update, scripts: ["address"], message:"You have successful updated your profile"})
})


router.get("/wishlist/product-add", async(req, res, next) => {
  res.json(await UserModel.find());
})


router.post("/wishlist/product-add/:id", async(req,res, next) => {
  
  try{

    const wishlistBeer = await BeerModel.findById(req.params.id)

        res.json(await UserModel.findByIdAndUpdate(req.session.currentUser._id, {$push: {wishlists: req.params.id}}, {new: true}))

    }catch(err){
      next(err);
  }
})


router.get("/wishlist/list", async(req,res,next) => {
  try{

    const wishlist = await UserModel.findById(req.session.currentUser._id).populate("wishlists")
    // console.log("user, wishlist", wishlist);
    res.render("wishlist", {user: wishlist});

  }catch(err){
    next(err)
  }
  
})

// GET to delete the added items from the user's wishlists
router.get("/wishlist/product-delete/:id", async(req, res, next) => {
    try{

      const deleteOne = await UserModel.findByIdAndUpdate(req.session.currentUser._id, {$pull: {wishlists: req.params.id}}, {new: true})
      res.redirect("/user/wishlist/list");
 
    }catch(err){
      next(err)
    }

})

module.exports = router;
