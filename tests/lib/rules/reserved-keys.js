/**
 * @fileoverview Check for object keys equal to a set of reserved ones
 * @author Ueli Kunz
 * @copyright 2014 Ueli Kunz. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require("eslint").linter,
    ESLintTester = require("eslint-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest("lib/rules/reserved-keys", {

    valid: [

        {
            code: "this.accountId = 1; expect();"
        },
        {
            code: "this.id = 1; log();"
        },
        {
            args: [1, {keywords: [":)"]}],
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
