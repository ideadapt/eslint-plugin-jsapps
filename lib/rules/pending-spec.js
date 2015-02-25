/**
 * @fileoverview Do not use xdescribe or xit. Especially usefull in CI
                 environments.
 * @author Manuel Alabor
 * @copyright 2015 Ueli Kunz. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    // variables should be defined here

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function(node){
            var callee = node.callee;
            var focusedSpecNames = ["xit", "xdescribe"];

            if (focusedSpecNames.indexOf(callee.name) !== -1 && node.arguments.length === 2){
                context.report(callee, "do not use {{varname}}", { varname: callee.name });
            }
        }
    };
};
