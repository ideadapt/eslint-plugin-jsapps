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
        {
            code: "expect(items.length).toBeGreaterThan(0); items.forEach(log);"
        },
        {
            code: "expect(items.length).not.toBe(0); items.forEach(log);"
        },
        {
            code: "var items = []; items.forEach(log);"
        },
        {
            code: "items.forEach(log);"
        },
        {
            code: "expect(context.state.items.length); context.state.items.forEach(log);"
        },
        {
            code: "lib.expect('');"
        }
    ],

    invalid: [
        {
            code: "expect(items).toBeDefined(); items.forEach(log);",
            errors: [{
                message: "length check for items required before calling forEach on it.",
                type: "Identifier"
            }]
        },
        {
            code: "expect(items.l).toBeDefined(); items.forEach(log);",
            errors: [{
                message: "length check for items required before calling forEach on it.",
                type: "Identifier"
            }]
        },
        {
            code: "expect(context.state.items).toBeDefined(); context.state.items.forEach(log);",
            errors: [{
                message: "length check for context.state.items required before calling forEach on it.",
                type: "MemberExpression"
            }]
        }
    ]
});
