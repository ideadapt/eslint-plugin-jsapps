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
            code: "[].forEach()"
        },
        {
            code: "[].forEach"
        },
        {
            code: "[].filter()"
        },
        {
            code: "Array.isArray()"
        },
        {
            code: "_.includes()"
        },
        {
            code: "_.find()"
        },
        {
            code: "[].map()"
        },
        {
            code: "''.split()"
        },
        {
            code: "_.isEqual()"
        },
        {
            code: "a + b"
        }
    ],

    invalid: [
        {
            code: "_.forEach()",
            errors: [{
                message: "Use forEach of Array instead.",
                type: "Identifier"
            }]
        },
        {
            code: "_.forEach",
            errors: [{
                message: "Use forEach of Array instead.",
                type: "Identifier"
            }]
        },
        {
            code: "_.reduce",
            errors: [{
                message: "Use reduce of Array instead.",
                type: "Identifier"
            }]
        },
        {
            code: "_.map",
            errors: [{
                message: "Use map of Array instead.",
                type: "Identifier"
            }]
        },
        {
            code: "_.isArray()",
            errors: [{
                message: "Use isArray of Array instead.",
                type: "Identifier"
            }]
        },
        {
            code: "_.split()",
            errors: [{
                message: "Use split of String instead.",
                type: "Identifier"
            }]
        },
        {
            code: "_.join()",
            errors: [{
                message: "Use join of String instead.",
                type: "Identifier"
            }]
        },
        {
            code: "[].includes()",
            errors: [{
                message: "Use includes of _ instead.",
                type: "ArrayExpression"
            }]
        },
        {
            code: "[].find()",
            errors: [{
                message: "Use find of _ instead.",
                type: "ArrayExpression"
            }]
        },
        {
            code: "angular.equals()",
            errors: [{
                message: "Use isEqual of _ instead.",
                type: "Identifier"
            }]
        }
    ]
});
