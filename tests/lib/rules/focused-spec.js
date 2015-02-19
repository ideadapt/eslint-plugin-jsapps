/**
 * @fileoverview Do not use iit, ddescribe, fdescribe, fit. Especially usefull in CI environments.
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
eslintTester.addRuleTest("lib/rules/focused-spec", {

    valid: [
        "it('should fly', function(){})",
        "describe('should fly', function(){})"
    ],

    invalid: [
        {
            code: "iit('should fly', function(){})",
            errors: [{
                message: "do not use iit",
                type: "Identifier"
            }]
        },
        {
            code: "fit('should fly', function(){})",
            errors: [{
                message: "do not use fit",
                type: "Identifier"
            }]
        },
        {
            code: "ddescribe('should fly', function(){})",
            errors: [{
                message: "do not use ddescribe",
                type: "Identifier"
            }]
        },
        {
            code: "fdescribe('should fly', function(){})",
            errors: [{
                message: "do not use fdescribe",
                type: "Identifier"
            }]
        },
        {
            code: "iit('should fly', fn.bind(null))",
            errors: [{
                message: "do not use iit",
                type: "Identifier"
            }]
        }
    ]
});
