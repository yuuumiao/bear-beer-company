const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    firstName: String, 
    lastName: String,
    isAdult: Boolean, 
    Email: {type: String, unique: true} ,
    Address: {
            streetNumber: Number,
            streetName: String
            city: String,
            postcode: String,
            telephone: String
    },
    wishlists: [ { type: Schema.Types.ObjectId, ref: "products"} ],
    role: { type: String, enum:["user", "admin"], default: user },
    hashPassword: {type:string, require: true}    
},
{ timestamps: true })

const UserModel = mongoose.model("user", BeerSchema);
module.exports = UserModel;