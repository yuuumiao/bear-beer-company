const hbs = require("hbs");

//show a number of characters in a specify string
hbs.registerHelper('trimString', function (passedString, startstring, endstring) {
        const theString = passedString.substring(startstring, endstring);
        return new hbs.SafeString(theString)
});


hbs.registerHelper("stars", function (value) {
        // console.log(value)
        // return "<h1>Hello people</h1>"
        const unit = Math.floor(value);
        const demical = value - unit;
        let starsArr = '';
        for(let i=0; i < unit.length; i++){
                
        }
})