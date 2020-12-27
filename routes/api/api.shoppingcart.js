const express = require('express');
const router = express.Router();
const BeerModel = require("./../../models/Product");
const UserModel = require("./../../models/User");
const CartModel = require("./../../models/Cart");
const PendingModel = require("./../../models/PendingOrder");


//Get shopping cart page
router.get("/", async (req, res, next) => {
        let productsAdded = '';
        try {
                const getCarts = await CartModel.find();
                console.log(getCarts)
                if (getCarts.length !== 0) {
                        const carts = await CartModel.find().populate("items.productId")
                        productsAdded = carts[0].items;
                        res.render("shopping-cart", { productsAdded, scripts: ["shopping-cart"] });
                } else {
                        res.render("shopping-cart", { productsAdded, scripts: ["shopping-cart"] });
                }

        } catch (err) {
                next(err)
        }

})

//GET Checkout
router.get("/checkout", async (req, res, next) => {
        const user = req.session.currentUser._id;
        const cart = await CartModel.find().populate("items.productId");
        // console.log(cart[0].items)
        // res.json(cart[0].items)
        try {
                await PendingModel.create({ user: user, cartId: cart[0].items });
                await CartModel.remove({});
                res.render("checkout");
        } catch (err) {
                next(err, { message: "NO BEER IN YOUR CART" })
        }

});
//check profile
router.get("/checkout/checkprofile", async (req, res, next) => {
        // const user = req.session.currentUser
        res.render('checkprofile', { user: req.session.currentUser, scripts: ["address"], titlePage: "Check Profile" })
});

// GET for user/profile with req.session.currentUser
router.post("/checkout/checkprofile", async (req, res, next) => {

        const update = await UserModel.findByIdAndUpdate(req.session.currentUser._id, req.body, { new: true })
        req.session.currentUser = update;

        res.render('checkprofile', { user: update, scripts: ["address"], message: "You have successful updated your profile", titlePage: "Check Profile" })
})


router.post("/:id", async (req, res, next) => {
        const { quantity, productId } = req.body;
console.log(productId)
        try {
                if ((await CartModel.find()).length == 0) {
                        res.json(await CartModel.create({ items: [req.body] }));
                } else {
                        const checkDuplicate = await CartModel.find({"items.productId": productId});
                        console.log(checkDuplicate)
                        if (checkDuplicate.length !== 0) {
                                console.log("here")
                                res.json(await CartModel.updateOne({"items.productId": productId}, {$inc:{"items.$.quantity":quantity}},{new:true, upsert:true}));
                               
                        } else {
                                console.log("there")
                                res.json(await CartModel.updateOne({ $push: { items: req.body } }));
                        }

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