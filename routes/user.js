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
  // console.log("post here", req.session);
  // console.log("reqbody", req.body);

  const update = await UserModel.findByIdAndUpdate(req.session.currentUser._id, req.body, {new: true})
  req.session.currentUser = update;
  ///Need to update the Model and session together, sort of

  // console.log("update", update);

  res.render('profile', {user : update, scripts: ["address"], message:"You have successful updated your profile"})
})


//will move to the api/api.wishlist.js
//this get is for seeing all the infomation
router.get("/wishlist/product-add", async(req, res, next) => {
  res.json(await UserModel.find());
})


router.post("/wishlist/product-add/:id", async(req,res, next) => {
  // console.log("body", req.body);
  
  try{

    const wishlistBeer = await BeerModel.findById(req.params.id)

      // console.log("beer", wishlistBeer)
      // console.log("currentUser", req.session.currentUser)
      // if (){

        res.json(await UserModel.findByIdAndUpdate(req.session.currentUser._id, {$push: {wishlists: req.params.id}}, {new: true}))

        //https://stackoverflow.com/questions/30888282/how-to-remove-duplicate-values-inside-a-list-in-mongodb

      // }
      

    }catch(err){
      next(err);
  }
})


router.get("/wishlist/list", async(req,res,next) => {
  try{

    // console.log(req.session.currentUser)
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
      // res.json(await UserModel.findByIdAndUpdate(req.session.currentUser._id, {$pull: {wishlists: req.params.id}}, {new: true}))
 
    }catch(err){

      next(err)

    }

})

// GET to fix the bug of user/auth/logout router
// router.get("/auth/logout", (req,res, next) => {
//   res.redirect("/auth/logout")
// })

// GET for Admin manage the user dashboard, if needed later
// router.get('/profile/:id', async (req, res, next) =>{
//   // how to know id user??? => to UserModel.findbyId
//   const profile = await UserModel.findById(req.params.id) 
//   // console.log(user);
//   res.render("profile", {user: profile, scripts: ["address"]})
// });

//POST for Admin manage the user dashboard, if needed
// router.post("/profile/:id", async (req, res, next) => {
//   // res.render("profile")
//   console.log(req.body)
//   const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
//   console.log(user)
//   // res.send("working in progress")
//   res.render("profile", {user})
// })



module.exports = router;
