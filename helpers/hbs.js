const hbs = require("hbs");

//show a number of characters in a specify string
hbs.registerHelper('trimString', function (passedString, startstring, endstring) {
        if (passedString.split('').length < endstring) {
                return passedString;
        } else {
                const theString = passedString.substring(startstring, endstring);
                return (new hbs.SafeString(theString)) + "...";
        }

});

//show rate in reviews
hbs.registerHelper("stars", function (value) {
        const unit = Math.floor(value);
        const demical = value - unit;
        let array = ''

        for (let i = 0; i < unit; i++) {
                array += `<img src="/images/full-star.png" width="10px">`;
        }
        if (demical > 0.5) array += `<img src="/images/half-star.png" width="10px">`;
        return array;

})

//calculate average rates
hbs.registerHelper("average", function (arrayReviews) {
        let sum = 0;
        let count = 0;
        arrayReviews.forEach(review => {
                if (review.rate) {
                        sum += review.rate;
                        count += 1
                }
        })
        if (sum === 0) return `No reviews`
        else return +(sum / count).toFixed(1)
})


//check stock
hbs.registerHelper("stock", function (qClient, qStock) {
        if (qClient > qStock) {
                return `<p>Sorry, we have only ${qStock} beers in stocks. Please delete our choice and modify your quantity</p>`
        } else {
                return qClient;
        }
})

// //check current windown
// hbs.registerHelper("whatURL", function(a){
//         console.log(a);
//         return "yeahhhhhhhhhhhh"
// })
//check empty value
hbs.registerHelper('check', function (value) {
        console.log(value == '')
        return (value == '') ? false : true;
});