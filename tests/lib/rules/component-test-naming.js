/**
 * @fileoverview Disallow certain API usages, in favour of others.
 * @author Ueli Kunz
 * @copyright 2014 Ueli Kunz. All rights reserved.
 */
"use strict";

var rule = require("../../../lib/rules/component-test-naming"),
    RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("component-test-naming", rule, {

    valid: [
        {
            code: "angular.module('xy').controller('myctrl')"
        },
        {
            code: "angular.module('ibng.e2eComponentTests.MyComponent').controller('MyComponentControllerTest')"
        },
        {
            options: [{componentModule: ".anyThing."}],
            code: "angular.module('ibng.e2eComponentTests.MyComponent').component('')"
        },
        {
            code: "angular.module('ibng.e2eComponentTests.MyComponent').component('MyComponentTest')"
        }
    ],

    invalid: [
        {
            code: "angular.module('ibng.e2eComponentTests.MyComponent').controller('MyComponentController')",
            errors: [{
                message: "Controller / Component name must end with 'Test'",
                type: "Literal"
            }]
        },
        {
            code: "angular.module('ibng.e2eComponentTests.MyComponent').component('MyComponent')",
            errors: [{
                message: "Controller / Component name must end with 'Test'",
                type: "Literal"
            }]
        }
    ]
});
