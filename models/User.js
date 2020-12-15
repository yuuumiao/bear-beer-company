const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    firstName: String,
    lastName: String,
    isAdult: {type: Boolean, default: true},
    email: { type: String, unique: true },
    address: {
        street_number: Number,
        route: String,
        locality: String,
        administrative_area_level_1: String,
            country: String,
            postal_code: String,
        telephone: String
    },
    wishlists: [{ type: Schema.Types.ObjectId, ref: "products" }],
    role: { type: String, enum: ["user", "admin"], default: "user" },
    passwordHash: { type: String } //require: true
},
{ timestamps: true })
//gopgle map api with the auto fill the address 
//8 lines code, there is a tutorial

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;