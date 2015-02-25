/**
 * @fileoverview Do not use iit, ddescribe, fdescribe, fit, xit, xdescribe.
 *               Especially usefull in CI environments.
 * @author Ueli Kunz
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
            var focusedSpecNames = ["iit", "fit", "ddescribe", "fdescribe", "xit", "xdescribe"];

            if (focusedSpecNames.indexOf(callee.name) !== -1 && node.arguments.length === 2){
                context.report(callee, "do not use {{varname}}", { varname: callee.name });
            }
        }
    };
};
