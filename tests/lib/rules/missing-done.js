/**
 * @fileoverview Report expect usages within a callback, that are not within a spec with a done argument.
 * @author Ueli Kunz
 * @copyright 2016 Ueli Kunz. All rights reserved.
 */
"use strict";

var rule = require("../../../lib/rules/missing-done"),
    RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("missing-done", rule, {

    valid: [
        {
            code: "it('', function(done){ setTimeout(function(){ expect(); done(); }); })"
        },
        {
            code: "it('', function(done){ setTimeout(function(){ expect(); }); done(); })"
        },
        {
            code: "it('', function(done){ setTimeout(function(){ expect(); }); })"
        },
        {
            code: "function helper(){ setTimeout(function(){ expect(); }); }"
        },
        {
            code: "it('', function(){ function helper(){ expect(); } })"
        }
    ],

    invalid: [
        {
            code: "it('', function(){ setTimeout(function(){ expect(); }) })",
            errors: [{
                message: "expect statement within callback must be combined with done callback.",
                type: "CallExpression"
            }]
        },
        {
            code: "it('', function(){ new Promise(function(res){ res(); }).then(function(){ expect(); }) })",
            errors: [{
                message: "expect statement within callback must be combined with done callback.",
                type: "CallExpression"
            }]
        }
    ]
});
