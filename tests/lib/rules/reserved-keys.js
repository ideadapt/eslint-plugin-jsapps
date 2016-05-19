/**
 * @fileoverview Check for object keys equal to a set of reserved ones
 * @author Ueli Kunz
 * @copyright 2014 Ueli Kunz. All rights reserved.
 */
"use strict";

var rule = require("../../../lib/rules/reserved-keys"),
    RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("reserved-keys", rule, {

    valid: [

        {
            code: "this.accountId = 1; expect();"
        },
        {
            options: [{keywords: [":)"]}],
            code: "this.id = 1; expect();"
        },
        {
            code: "this.selectedCard.id = 1; expect();"
        },
        {
            code: "other.id = 1; expect();"
        }
    ],

    invalid: [
        {
            code: "this.id = 1; expect();",
            errors: [{
                message: "Property name 'id' is a reserved identifier name. It might be used by another framework in this context.",
                type: "MemberExpression"
            }]
        },
        {
            code: "self.id = 1; expect();",
            errors: [{
                message: "Property name 'id' is a reserved identifier name. It might be used by another framework in this context.",
                type: "MemberExpression"
            }]
        }
    ]
});
