const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
        user: { type: Schema.Types.ObjectId, ref: "users", required: true },
        items: [
                {
                        product: { type: Schema.Types.ObjectId, ref: "products", required: true },
                        quantity: { type: Number, default: 1 },
                }
        ]
})
const CartModel = mongoose.model("cart", CartSchema);

module.exports = CartModel;
