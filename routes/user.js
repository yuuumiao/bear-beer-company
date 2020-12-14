var express = require('express');
var router = express.Router();
const UserModel = require("./../models/User");

/* GET users listing. */
// prefix /user
router.get('/profile/:id', async (req, res, next) =>{
  // how to know id user??? => to UserModel.findbyId
  const user = await UserModel.findById(req.params.id) 
  // console.log(user);
  res.render("profile", {user})
});

router.post("/profile/:id", async (req, res, next) => {
  // res.render("profile")
  console.log(req.body)
  const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
  console.log(user)
  // res.send("working in progress")
  res.render("profile", {user})
})



module.exports = router;
