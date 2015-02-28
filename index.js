"use strict";

module.exports = {
    rules: {
        "expect-length": require("./lib/rules/expect-length"),
        "focused-spec": require("./lib/rules/focused-spec")
    },
    rulesConfig: {
		"expect-length": 2
    }
};
