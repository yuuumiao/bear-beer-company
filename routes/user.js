var express = require('express');
var router = express.Router();
const UserModel = require("./../models/User");
const BeerModel = require("./../models/Product")

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
  ///Need to update the Model and session together, sort of//

  // console.log("update", update);

  res.render('profile', {user : update, scripts: ["address"], message:"You have successful updated your profile"})
})


router.get("/wishlist/product-add/:id", async(req,res, next) => {
  console.log("here");
  try{

    const beer = await BeerModel.findById(req.params.id)
      console.log("bber", beer)
      console.log("currentUser", req.session.currentUser)
      // const user = await UserModel.findById(req.session.currentUser._id)
      // console.log(user)
      // user.update
     UserModel.update(

      { _id: req.session.currentUser._id },
      { $push: { wishlists: beer } }

     )
     res.send("hello updating")
  }catch(err){
      next(err);
  }
})

// GET for Admin manage the user dashboard, if needed
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
