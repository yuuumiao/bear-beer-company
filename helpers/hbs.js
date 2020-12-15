const hbs = require("hbs");

//show a number of characters in a specify string
hbs.registerHelper('trimString', function (passedString, startstring, endstring) {
        const theString = passedString.substring(startstring, endstring);
        return new hbs.SafeString(theString)
});

