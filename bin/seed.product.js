// Wants to insert many in the reinforcement-sesh database
require("dotenv").config();
require("./../configs/mongo");
const mongoose = require("mongoose");
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
    reviews: [
      {
        userId: "5fe7b2e7637a4200172ef10f",
        rate: 4.7,
        comment: "This is the best lager I've ever had. Worth every penny. If you can get it on draught anywhere I recommend it but it's just as good from the bottle. If you like a stronger lager, this is the one for you"
      }
    ]
  },
  {
    name: "DIE BIO WEISSE HELL GLUTENFREI",
    price: 2,
    quantity: 100,
    category: "Dunkel",
    description: `"DIE BIO WEISSE HELL" is the first organic and gluten-free wheat beer on the entire market. Our special brewing process breaks down the gluten in the beer. Our amber-colored organic Weisse is brewed exclusively from organic raw materials sourced from sustainable Austrian cultivation to guarantee the highest quality.`,
    image: "https://cdn.shopify.com/s/files/1/0451/3461/0595/products/die-weisse-bier-_0003_Glutenfrei-05_370x.jpg?v=1596729171",
    reviews: [
      {
        userId: "5fe7b34a637a4200172ef112",
        rate: 4.6,
        comment: "one hell of a good beer"
      }

    ]
  },
  {
    name: "DIE BIO WEISSE ALKOHOLFREI",
    price: 3,
    quantity: 200,
    category: "Lager",
    description: `Our non-alcoholic wheat beer, brewed using sustainable organic raw materials, is the ideal thirst quencher after exercising and for regeneration. Rich in vitamins, isotonic, and gluten-free.
    A beer can be regarded as alcohol free if its alcohol content does not exceed 0.5%. The decision to drink an alcohol-free "WEISSE" does not come from the gut but from the brain - and more and more often!`,
    image: "https://cdn.shopify.com/s/files/1/0451/3461/0595/products/die-weisse-bier-_0001_alkoholfrei-05_370x.jpg?v=1596729185",
    reviews: [
      {
        userId: "5fe7b2e7637a4200172ef10f",
        rate: 4,
        comment: "A sweet wheat beer with a distant nutty note, not my personal taste but if you like a regular wheat beer then definitely worth a try to enjoy the lingering light aftertaste."
      }
    ]
  },
  {
    name: "Die Weisse Dunkel",
    price: 4,
    quantity: 100,
    category: "Pilsner",
    description: "DIE WEISSE DUNKEL is produced from five different special types of malt. This beer has only a hint of hops on the nose, but is lively at the same time, with a firm head and a pronounced fruity note and a long malty finish.",
    image: "https://cdn.shopify.com/s/files/1/0451/3461/0595/products/die-weisse-bier-_0004_Hell-05_370x.jpg?v=1596729186",
    reviews: [
      {
        userId: "5fe7b34a637a4200172ef112",
        rate: 4,
        comment: "Easy drinking, solid beer. Would definitely buy again."
      },
      {
        userId: "5fe7b34a637a4200172ef112",
        rate: 5,
        comment: "This is always a go to drink if you are suffering with a hangover or illness. Guaranteed to make you feel better! Plus it’s unique taste and flavour make it better. Best served ice cold."
      },
    ]
  },
  {
    name: "Die Weisse Bock",
    price: 5,
    quantity: 100,
    category: "Ale",
    description: "DIE WEISSE BOCK has a nutty, sherry-like aroma, is bubbly while sipping it yet dry in the finish. To also be enjoyed as a special holiday drink during Christmas and Easter as well as a Maibock",
    image: "https://cdn.shopify.com/s/files/1/0451/3461/0595/products/2020-06-19_DieWeisse-11655_merged-bock-small_370x.jpg?v=1606899067",
    reviews: [
      {
        userId: "5fe7b434637a4200172ef116",
        rate: 4,
        comment: "one hell of a good beer"
      },
      {
        userId: "5fe7b34a637a4200172ef112",
        rate: 2,
        comment: "one hell of a good beer"
      },
      {
        userId: "5fe7b2e7637a4200172ef10f",
        rate: 2,
        comment: "one hell of a good beer"
      },
    ]
  },
  {
    name: "DIE WEISSE ORIGINAL 1901",
    price: 6,
    quantity: 400,
    category: "Wheat",
    description: `The "black Weisse" is brewed according to the original recipe of founder Adelbert Behr [from the year 1901] and is served during Lent before Easter. It has a chocolaty flavor when first taking a sip with fine roasted malt flavors and a discreet hint of hops. Sinfully good...`,
    image: "https://cdn.shopify.com/s/files/1/0451/3461/0595/products/webfinal032020-08-28_SALZBURGER-Hell-0_33-916x1200Kopie_370x.png?v=1600761980",
    reviews: [
      {
        userId: "5fe7b434637a4200172ef116",
        rate: 4.5,
        comment: "These dudes have been brewing beer since forever and it shows in this stupendous beer it could only be improved by coming in the 500ml bottle but don't let that put you off ."
      },
      {
        userId: "5fe7b34a637a4200172ef112",
        rate: 2,
        comment: "Very good beer. Highly recommended. Easy to drink and very moreish"
      },
    ]
  },
  {
    name: "Eggenberg",
    price: 4,
    quantity: 400,
    category: "Ale",
    description: `Our excellent pils, brewed with the world-famous Saazer hops. Hopfenkonig has a crisp, clean, dry hoppy nose and aromatic flavours. It is a perfect aperitif beer.`,
    image: "https://www.beersofeurope.co.uk/images/product/l/EggenbergClassicMarzen.jpg?t=1598997167",
    reviews: [
      {
        userId: "5fe7b2e7637a4200172ef10f",
        rate: 3,
        comment: "Notable hoppy aroma and taste to this lager. Very easy to drink and very tasty."
      },
      {
        userId: "5fe7b34a637a4200172ef112",
        rate: 4,
        comment: "Bought this for my dad, he said he would have it again."
      },
    ]
  },
  {
    name: "Pelforth Blonde",
    price: 3,
    quantity: 400,
    category: "Dunkel",
    description: `A top-fermented beer, brewed with three different hops collected from three continents.
    Described as a mix between the French 'Biere de Garde' style and an IPA.`,
    image: "https://www.beersofeurope.co.uk/images/product/source/PelforthBlonde250ml.jpg?t=1602516221",
    reviews: [
      {
        userId: "5fe7b2e7637a4200172ef10f",
        rate: 4,
        comment: "This is a fantastic Blonde Lager, Pelforth is incredibly tasty with such wonderful aromas and hints of France. This tastes just like it has been poured from the tap in France."
      },
      {
        userId: "5fe7b434637a4200172ef116",
        rate: 3,
        comment: "ingering and very tangy."
      },
    ]
  },
];

// empty the db
BeerModel.deleteMany()
  .then(async () => {
    // insert all robots
    const insertedBeers = await BeerModel.insertMany(beers);
    // print result
    console.log(`ok : ${insertedBeers.length} beers inserted`);
  })
  .then(()=>  mongoose.disconnect())
  .catch((err) => {
    console.log(err);
  });
