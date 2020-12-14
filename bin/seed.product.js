// Wants to insert many in the reinforcement-sesh database
require("dotenv").config();
require("./../config/connect-db");

const BeerModel = require("./../models/Product");

const beers = [
  {
    chip: "XB-ALPHA-QUATRON",
    name: "B0B",
    price: 1000000,
    speechEnabled: true,
    features: ["GPS", "close combat", "flight"],
  },
  {
    chip: "QRR-3X",
    name: "Jane",
    price: 200,
    speechEnabled: false,
    features: ["nice colors"],
  },
  {
    chip: "XB-ALPHA-QUATRON",
    name: "JACK",
    price: 1000000,
    speechEnabled: false,
    features: ["GPS"],
  },
  {
    chip: "XB-ALPHA-B2",
    name: "terminator",
    price: 1000,
    speechEnabled: true,
    features: ["berzerk instinct"],
  },
  {
    chip: "01010101",
    name: "r2d2",
    price: 100000,
    speechEnabled: false,
    features: ["bleep lang", "fight flight assistant"],
  },
  {
    chip: "XCORE-REACT-ALPHA",
    name: "B-22",
    price: 1000000,
    speechEnabled: false,
    features: ["typo", "interpret", "diplomat", "cook"],
  },
];

// empty the db
RobotModel.deleteMany()
  .then(async () => {
    // insert all robots
    const insertedBots = await RobotModel.insertMany(robots);
    // print result
    console.log(`ok : ${insertedBots.length} robots inserted`);
  })
  .catch((err) => {
    console.log(err);
  });
