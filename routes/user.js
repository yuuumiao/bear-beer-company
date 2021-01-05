var express = require('express');
var router = express.Router();
const UserModel = require("./../models/User");
const BeerModel = require("./../models/Product");
const protectPrivateRoute = require('../middlewares/protectPrivateRoute');

/* GET users listing. */

router.use(protectPrivateRoute);
/////// PREFIX:  /user //////////


// GET for user/profile with req.session.currentUser
router.get("/profile", (req, res, next) => {

  const user = req.session.currentUser
  console.log("user", user);

  res.render('profile', { user: req.session.currentUser, scripts: ["address"], titlePage: "Profile" })
})


// GET for user/profile with req.session.currentUser
router.post("/profile", async (req, res, next) => {

  const update = await UserModel.findByIdAndUpdate(req.session.currentUser._id, req.body, { new: true })
  req.session.currentUser = update;

  res.render('profile', { user: update, scripts: ["address"], message: "You have successful updated your profile", titlePage: "Profile" })
})


router.get("/wishlist/product-add", async (req, res, next) => {
  res.json(await UserModel.find());
})


router.post("/wishlist/product-add/:id", async (req, res, next) => {

  try {

    const checkDuplicate = await UserModel.findOne({_id:req.session.currentUser._id},{wishlists:1,_id:0});
    const list = checkDuplicate.wishlists;
    // console.log(req.params.id)
    if(list.indexOf(req.params.id) ==-1){
      res.json(await UserModel.findByIdAndUpdate(req.session.currentUser._id, { $push: { wishlists: req.params.id } }, { new: true }));
    }
  } catch (err) {
    next(err);
  }
})


router.get("/wishlist/list", async (req, res, next) => {
  try {

    const wishlist = await UserModel.findById(req.session.currentUser._id).populate("wishlists")
    console.log("user, wishlist", wishlist);
    res.render("wishlist", { user: wishlist, titlePage: "WishList" });

  } catch (err) {
    next(err)
  }

})

// GET to delete the added items from the user's wishlists
router.get("/wishlist/product-delete/:id", async (req, res, next) => {
  try {

    const deleteOne = await UserModel.findByIdAndUpdate(req.session.currentUser._id, { $pull: { wishlists: req.params.id } }, { new: true })
    res.redirect("/user/wishlist/list");

  } catch (err) {
    next(err)
  }

})

module.exports = router;
