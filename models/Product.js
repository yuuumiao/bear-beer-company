const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BeerSchema = new Schema({

        name: { type: String, required: true, trim: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        category: { type: String, enum: ["Pilsner", "Dunkel", "Ale", "Lager", "Wheat", "Stout", "Porter", "Marzen"] },
        description: { type: String, required: true, trim: true },
        Image: { type: String, default: "https://via.placeholder.com/300" },
        reviews: {
                userId: { type: Schema.Types.ObjectId, ref: "user" },
                rate: [Number],
                comment: [String]
        }
})
const BeerModel = mongoose.model("beer", BeerSchema);

module.exports = BeerModel;
