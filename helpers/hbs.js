const hbs = require("hbs");

//show a number of characters in a specify string
hbs.registerHelper('trimString', function (passedString, startstring, endstring) {
        const theString = passedString.substring(startstring, endstring);
        return new hbs.SafeString(theString)
});

// add comparison operator feature to hbs templates
/* 

USAGE =>

{{#compare 1 10 operator="<"}}
awesome, 1 is less thant 10 !!!
{{/compare}}

*/

hbs.registerHelper("compare", function (lvalue, rvalue, options) {
        if (arguments.length < 3)
                throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

        var operator = options.hash.operator || "==";

        var operators = {
                "==": function (l, r) {
                        return l == r;
                },
                "===": function (l, r) {
                        return l === r;
                },
                "!=": function (l, r) {
                        return l != r;
                },
                "<": function (l, r) {
                        return l < r;
                },
                ">": function (l, r) {
                        return l > r;
                },
                "<=": function (l, r) {
                        return l <= r;
                },
                ">=": function (l, r) {
                        return l >= r;
                },
                typeof: function (l, r) {
                        return typeof l == r;
                }
        };

        if (!operators[operator])
                throw new Error(
                        "Handlerbars Helper 'compare' doesn't know the operator " + operator
                );

        var result = operators[operator](lvalue, rvalue);

        if (result) {
                return options.fn(this);
        } else {
                return options.inverse(this);
        }
});