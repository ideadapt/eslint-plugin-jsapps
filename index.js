"use strict";

module.exports = {
    rules: {
        "expect-length": require("./lib/rules/expect-length"),
        "no-absolute-path": require("./lib/rules/no-absolute-path")
    },
    rulesConfig: {
		"expect-length": 2,
		"no-absolute-path": 2
    }
};
