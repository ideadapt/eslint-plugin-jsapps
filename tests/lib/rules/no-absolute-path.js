/**
 * @fileoverview Do not allow paths like /api/docs, force ./api/docs
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
eslintTester.addRuleTest("lib/rules/no-absolute-path", {

    valid: [
        "var a = \"./api/docs\"",
        "var a = \"Choose your pill: red/blue.\"",
        "var a = 10;",
        "var a = \"./api\"+\"/sub\""
    ],

    invalid: [
        {
            code: "var a = \"/api/docs\"",
            errors: [{
                message: "Paths should be relative and therefore start with './'",
                type: "Literal"
            }]
        },
        {
            code: "var a = \"/api\"+\"/sub\"",
            errors: [{
                message: "Paths should be relative and therefore start with './'",
                type: "Literal"
            }]
        }
    ]
});
