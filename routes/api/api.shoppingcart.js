const express = require('express');
const router = express.Router();
const BeerModel = require("./../../models/Product");
const UserModel = require("./../../models/User");
const CartModel = require("./../../models/Cart");
const PendingModel = require("./../../models/PendingOrder");


//Get shopping cart page
router.get("/", async (req, res, next) => {
        try {
                const carts = await CartModel.find().populate("items.productId")
                const productsAdded = carts[0].items;
                // res.json(carts)
                console.log(productsAdded);
                res.render("shopping-cart", { productsAdded, scripts: ["shopping-cart"] });
        } catch (err) {
                next(err)
        }

})

//GET Checkout
router.get("/checkout", async (req, res, next) => {
        const user = req.session.currentUser._id;
        const cart = await CartModel.find();
        const cartId = cart[0]._id;
        if(PendingModel)
        await PendingModel.create({ orders: { user: user, cartId: cartId } });
        await CartModel.updateOne({items:[]})
        res.render("checkout");
});


router.post("/:id", async (req, res, next) => {
        console.log(req.body)
        try {
                if ((await CartModel.find()).length == 0) {
                        res.json(await CartModel.create({ items: [req.body] }));
                } else {
                        res.json(await CartModel.updateOne({ $push: { items: req.body } }));
                }
        } catch (err) {
                next(err)
        }


});
// delete product in shopping cart
router.get("/delete/:id", async (req, res, next) => {
        try {
                console.log("here: ", req.params.id)
                await CartModel.updateOne({ $pull: { items: { _id: req.params.id } } });
                res.redirect("/shoppingcart");
        } catch (err) {
                next(err)
        }
});



module.exports = router;