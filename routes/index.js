var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// GET products page to show all products
router.get("/collection", function(req, res, next){
//  await get here { products }
res.render("products")
})

//Get item page
router.get("/collection/:id", function(req, res, next){
  // await findbyid , render { product }
  res.render("/item")
})

module.exports = router;



