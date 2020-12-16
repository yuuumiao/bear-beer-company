const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurrentCartSchema = new Schema({
        items:[
                {
                        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
                        quantity: { type: Number, default: 1, required: true, min: [1, 'Quantity can not be less than 1'] },
                }
        ]
})

const CurrentCartModel = mongoose.model("currentCart", CurrentCartSchema);

module.exports = CurrentCartModel;
