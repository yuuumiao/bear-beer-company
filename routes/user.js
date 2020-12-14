var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/profile', function(req, res, next) {
  // how to know id user??? => to UserModel.findbyId
  res.render("profile")
});

router.post("/profile", function(req, res, next){
  // res.render("profile")
})
module.exports = router;
