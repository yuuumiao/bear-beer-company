const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({

        items: [
                {
                        productId: { type: Schema.Types.ObjectId, ref: "Beer", required: true },
                        quantity: { type: Number, default: 1, required: true, min:[1, 'Quantity can not be less than 1'] },
                }
        ]
})
const CartModel = mongoose.model("cart", CartSchema);

module.exports = CartModel;
