const express = require('express');
const router = express.Router();
const BeerModel = require("../../models/Product");

router.get("/", async (req, res, next) => {
        try {

                res.json(await BeerModel.find())
        } catch (err) {
                next(err)
        }

});

router.get("/filter/:category", async (req, res, next) => {
        try {

                res.json(await BeerModel.find({ category: req.params.category }))
        } catch (err) {
                next(err)
        }

});

router.get("/filter/price/:smallestPrice/:largestPrice", async (req, res, next) => {
        try {

                res.json(await BeerModel.find({ $and: [{ price: { $gte: parseInt(req.params.smallestPrice) } }, { price: { $lt: parseInt(req.params.largestPrice) } }] }))
        } catch (err) {
                next(err)
        }

});
// router.get("/filter/lowtohighprice", async (req, res, next) => {
//         try {
//                 res.json(await BeerModel.find().sort(function (a, b) {
//                         return a.price - b.price;
//                 }));
//         } catch (err) {
//                 next(err)
//         }
// })
// router.get("/filter/hightolowprice", async (req, res, next) => {
//         try {
//                 res.json(await BeerModel.find().sort(function (a, b) {
//                         return -a.price + b.price;
//                 }));
//         } catch (err) {
//                 next(err)
//         }
// })
module.exports = router;