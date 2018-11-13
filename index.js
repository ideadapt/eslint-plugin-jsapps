"use strict";

module.exports = {
    rules: {
        "expect-length": require("./lib/rules/expect-length"),
        "reserved-keys": require("./lib/rules/reserved-keys"),
        "js-api-preference": require("./lib/rules/js-api-preference"),
        "component-test-naming": require("./lib/rules/component-test-naming")
    },
    rulesConfig: {
		"expect-length": 2,
		"reserved-keys": 2,
		"js-api-preference": 2,
		"component-test-naming": 2
    }
};
