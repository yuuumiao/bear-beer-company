const express = require('express');
const router = express.Router();
const BeerModel = require("../../models/Product");

router.get("/filter/:category", async (req, res, next) => {
        const catSearch = req.params.category.charAt(0).toUpperCase() + req.params.category.slice(1);
        //in products collections, the first letter of category names are uppercase
        try {
                
                res.json(await BeerModel.find({ category: catSearch }))
        } catch (err) {
                next(err)
        }

})

module.exports = router;