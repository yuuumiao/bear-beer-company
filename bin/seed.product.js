// Wants to insert many in the reinforcement-sesh database
require("dotenv").config();
require("./../configs/mongo");

const BeerModel = require("./../models/Product");

const beers = [
  {
    name: "DIE WEISSE HELL",
    price: 1,
    quantity: 100,
    category: "Pilsner",
    description: `"DIE WEISSE HELL" is a naturally cloudy wheat beer, comes in a swing top bottle, and has been double fermented (bottle conditioning).
    This amber-colored wheat beer is brewed from three different Austrian malts.
    Our own top-fermenting yeast gives the "WEISSE HELL" a gentle fruity note and a frothy head. Hallertau hops gives it the necessary bitterness.`,
    image: "https://cdn.shopify.com/s/files/1/0451/3461/0595/products/die-weisse-bier-_0004_Hell-05_370x.jpg?v=1596729186",
  },
  {
    name: "DIE BIO WEISSE HELL GLUTENFREI",
    price: 2,
    quantity: 100,
    category: "Dunkel",
    description: `DIE WEISSE HELL" is a naturally cloudy wheat beer, comes in a swing top bottle, and has been double fermented (bottle conditioning).
    This amber-colored wheat beer is brewed from three different Austrian malts.
    Our own top-fermenting yeast gives the "WEISSE HELL" a gentle fruity note and a frothy head. Hallertau hops gives it the necessary bitterness.`,
    image: "https://cdn.shopify.com/s/files/1/0451/3461/0595/products/die-weisse-bier-_0003_Glutenfrei-05_370x.jpg?v=1596729171"
  },
  {
    name: "DIE BIO WEISSE ALKOHOLFREI",
    price: 3,
    quantity: 200, 
    category: "Lager",
    description: `Our non-alcoholic wheat beer, brewed using sustainable organic raw materials, is the ideal thirst quencher after exercising and for regeneration. Rich in vitamins, isotonic, and gluten-free.
    A beer can be regarded as alcohol free if its alcohol content does not exceed 0.5%. The decision to drink an alcohol-free "WEISSE" does not come from the gut but from the brain - and more and more often!`,
    image: "https://cdn.shopify.com/s/files/1/0451/3461/0595/products/die-weisse-bier-_0001_alkoholfrei-05_370x.jpg?v=1596729185"
  },
  {
    name: "Die Weisse Dunkel",
    price: 4,
    quantity: 100,
    category: "Pilsner",
    description: "DIE WEISSE DUNKEL is produced from five different special types of malt. This beer has only a hint of hops on the nose, but is lively at the same time, with a firm head and a pronounced fruity note and a long malty finish.",
    image: "https://cdn.shopify.com/s/files/1/0451/3461/0595/products/die-weisse-bier-_0004_Hell-05_370x.jpg?v=1596729186",
  },
  {
    name: "Die Weisse Bock",
    price: 5,
    quantity: 100,
    category: "Ale",
    description: "DIE WEISSE BOCK has a nutty, sherry-like aroma, is bubbly while sipping it yet dry in the finish. To also be enjoyed as a special holiday drink during Christmas and Easter as well as a Maibock",
    image: "https://cdn.shopify.com/s/files/1/0451/3461/0595/products/2020-06-19_DieWeisse-11655_merged-bock-small_370x.jpg?v=1606899067",
  },
  {
    name: "Salzburger hell",
    price: 6,
    quantity: 400, 
    category: "Wheat",
    description: "",
    image: "https://cdn.shopify.com/s/files/1/0451/3461/0595/products/webfinal032020-08-28_SALZBURGER-Hell-0_33-916x1200Kopie_370x.png?v=1600761980"
  }
];

// empty the db
BeerModel.deleteMany()
  .then(async () => {
    // insert all robots
    const insertedBeers = await BeerModel.insertMany(beers);
    // print result
    console.log(`ok : ${insertedBeers.length} beers inserted`);
  })
  .catch((err) => {
    console.log(err);
  });
