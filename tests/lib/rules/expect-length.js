/**
 * @fileoverview If variable items is used like items.forEach, expect its length is tested before.
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
eslintTester.addRuleTest("lib/rules/expect-length", {

    valid: [
        //"getAll().then(function(items){ expect(items.length).toBeGreaterThan(0); items.forEach(function(item){ this.log(item); }); }"
        "var i=0;"
    ],

    invalid: [
        {
            //code: "getAll().then(function(items){items.forEach(function(item){ this.log(item); }); }",
            code: "var igit=1;",
            errors: [{
                message: "length check required",
                type: "Identifier"
            }]
        }
    ]
});
