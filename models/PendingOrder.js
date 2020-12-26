const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PendingSchema = new Schema({
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        cartId: [],
},{ timestamps: true })
const PendingModel = mongoose.model("pending", PendingSchema);

module.exports = PendingModel;
