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
        "expect(items.length).toBeGreaterThan(0); items.forEach(console.log);",
        "expect(items.length).not.toBe(0); items.forEach(console.log);"
    ],

    invalid: [
        {
            code: "items.forEach(console.log);",
            errors: [{
                message: "length check required before",
                type: "Identifier"
            }]
        },
        {
            code: "expect(items).toBeDefined(); items.forEach(console.log);",
            errors: [{
                message: "length check required before",
                type: "Identifier"
            }]
        },
        {
            code: "expect(items.l).toBeDefined(); items.forEach(console.log);",
            errors: [{
                message: "length check required before",
                type: "Identifier"
            }]
        }
        // {
        //     code: "items.forEach(console.log); expect(items.length).not.toBe(0);",
        //     errors: [{
        //         message: "length check required before",
        //         type: "Identifier"
        //     }]
        // }
    ]
});
