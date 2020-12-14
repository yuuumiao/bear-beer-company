const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    firstName: String,
    lastName: String,
<<<<<<< HEAD
    isAdult: {type: Boolean, default: true},
    email: { type: String, unique: true },
=======
    isAdult: Boolean, 
    email: {type: String, unique: true} ,
>>>>>>> abd6d590d0058af4fbd108eefccbb84f459d683a
    address: {
            streetNumber: Number,
            street: String,
            city: String,
            state: String,
        postcode: String,
        telephone: String
    },
    wishlists: [{ type: Schema.Types.ObjectId, ref: "products" }],
    role: { type: String, enum: ["user", "admin"], default: "user" },
    hashPassword: { type: String } //require: true
},
{ timestamps: true })
//gopgle map api with the auto fill the address 
//8 lines code, there is a tutorial

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;