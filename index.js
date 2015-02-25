"use strict";

module.exports = {
    rules: {
        "expect-length": require("./lib/rules/expect-length"),
        "focused-spec": require("./lib/rules/focused-spec"),
        "pending-spec": require("./lib/rules/pending-spec")
    },
    rulesConfig: {
    }
};
