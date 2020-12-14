const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    firstName: String,
    lastName: String,
    isAdult: Boolean, 
    email: {type: String, unique: true} ,
    address: {
            streetNumber: Number,
            street: String,
            city: String,
        postcode: String,
        telephone: String
    },
    wishlists: [{ type: Schema.Types.ObjectId, ref: "products" }],
    role: { type: String, enum: ["user", "admin"], default: user },
    hashPassword: { type: string, require: true }
},
<<<<<<< HEAD
    { timestamps: true })

=======
{ timestamps: true })
//gopgle map api with the auto fill the address 
//8 lines code, there is a tutorial
<<<<<<< HEAD
>>>>>>> fb4c5536d797e4654f0b71b01c1340e004597f19
const UserModel = mongoose.model("user", BeerSchema);
=======
const UserModel = mongoose.model("user", UserSchema);
>>>>>>> a6bd53edc1a5c7ca63b0834aa3fd8fd64e30e0f9
module.exports = UserModel;