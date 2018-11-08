/**
 * @fileoverview Disallow certain API usages, in favour of others.
 * @author Ueli Kunz
 * @copyright 2014 Ueli Kunz. All rights reserved.
 */
"use strict";

var rule = require("../../../lib/rules/js-api-preference"),
    RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("js-api-preference", rule, {

    valid: [
        {
            code: "[].forEach"
        },
        {
            code: "[].filter"
        },
        {
            code: "Array.isArray"
        },
        {
            code: "[].map"
        },
        {
            code: "a + b"
        }
    ],

    invalid: [
        {
            code: "_.forEach",
            errors: [{
                message: "Use Array.prototype.forEach instead",
                type: "Identifier"
            }]
        }
    ]
});
