const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PendingSchema = new Schema({

        orders: [
                {
                        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
                        cartId: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
                }
        ]
})
const PendingtModel = mongoose.model("pending", PendingSchema);

module.exports = PendingtModel;
