/**
 * @fileoverview If variable items is used like items.forEach, expect its length is tested before.
 * @author Ueli Kunz
 * @copyright 2014 Ueli Kunz. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    // variables should be defined here
    var failures = [];

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        "Program:exit": function(){
            failures.forEach(function(failure){
                failure();
            });
        },

        "CallExpression": function(node){
            var callee = node.callee;

            var forEachCalled = callee.type === "MemberExpression" && callee.property.name === "forEach";

            // ...

            if (!ok){
                const recommended = "";
                failures.push(context.report.bind(context, {
                    node: callee.object,
                    message: `Use ${recommended} instead.`
                }));
            }
        }
    };
};
