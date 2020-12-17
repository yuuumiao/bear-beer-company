// Wants to insert many in the reinforcement-sesh database
require("dotenv").config();
require("./../configs/mongo");
const bcrypt = require("bcrypt"); // lib to encrypt data
const saltRounds = 10;
const UserModel = require("./../models/User");


function createPassword(password){
    bcrypt
      .gennpm Salt(saltRounds)
      .then(salt => bcrypt.hash(password, salt))
      .catch(error => next(error));
}

const password = createPassword(12345) 

const users = [
  {
        firstName: "Beer",
        lastName: "Admin",
        isAdult: true,
        email: "admin@beer.com",
        role: "admin",
  },
  {
      firstName: "John",
      lastName: "Doe",
      isAdult: true,
      email: "johndoe@gmail.com",
      role: "user",

  }
  // {
  //     firstName: "Product",
  //     lastName: "Manager",
  //     isAdult: true,
  //     email: "product@beer.com",
  //     role: "admin",
  //     passwordHash: password

  // }
];

// empty the db
UserModel.deleteMany()
  .then(async () => {
    const insertedUsers = await UserModel.insertMany(users);
    console.log(`ok : ${insertedUsers.length} users inserted`);
  })
  .catch((err) => {
    console.log(err);
  });
