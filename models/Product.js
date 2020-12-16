const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BeerSchema = new Schema({

        name: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min:0 },
        quantity: { type: Number, required: true },
        category: { type: String, enum: ["Pilsner", "Dunkel", "Ale", "Lager", "Wheat", "Stout", "Porter", "Marzen"] },
        description: { type: String, trim: true },
        image: { type: String, default: "https://via.placeholder.com/300" },
        reviews: [{
                userId: { type: Schema.Types.ObjectId, ref: "User" },
                rate: {type: Number, min:0, max:5},
                comment: String
        }]
}, { timestamps: true })
const BeerModel = mongoose.model("Beer", BeerSchema);

module.exports = BeerModel;
