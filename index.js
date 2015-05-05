"use strict";

module.exports = {
    rules: {
        "expect-length": require("./lib/rules/expect-length"),
        "reserved-keys": require("./lib/rules/reserved-keys")
    },
    rulesConfig: {
		"expect-length": 2,
		"reserved-keys": 2
    }
};
