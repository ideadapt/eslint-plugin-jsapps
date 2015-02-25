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
eslintTester.addRuleTest("lib/rules/pending-spec", {

    valid: [
        "it('should fly', function(){})",
        "describe('should fly', function(){})"
    ],

    invalid: [
        {
            code: "xit('should fly', function(){})",
            errors: [{
                message: "do not use xit",
                type: "Identifier"
            }]
        },
        {
            code: "xdescribe('should fly', function(){})",
            errors: [{
                message: "do not use xdescribe",
                type: "Identifier"
            }]
        }
    ]
});
