"use strict";

module.exports = {
    rules: {
        "expect-length": require("./lib/rules/expect-length"),
        "reserved-keys": require("./lib/rules/reserved-keys"),
        "missing-done":  require("./lib/rules/missing-done")
    },
    rulesConfig: {
		"expect-length": 2,
		"reserved-keys": 2,
		"missing-done": 2
    }
};
