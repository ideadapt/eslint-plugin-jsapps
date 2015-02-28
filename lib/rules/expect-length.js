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
    var inTestFile = false;
    var failures = [];

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        "Program:exit": function(){
            if (inTestFile){
                failures.forEach(function(failure){
                    failure.call();
                });
            }
        },

        "CallExpression": function(node){
            var callee = node.callee;

            if (callee.type === "Identifier" && callee.name === "expect"){
                inTestFile = true;
            }

            if (callee.type === "MemberExpression" && callee.property.name === "forEach"){
                var shouldBeLengthChecked = callee.object.name; // items in "items.forEach"
                var ok = false;

                var scope = context.getScope(callee.object);
                for (var reference in scope.references) {
                    var ref = scope.references[reference];

                    if (ref.identifier.name === "expect" && ref.identifier.parent.type === "CallExpression") {
                        var expectArg = ref.identifier.parent.arguments[0];

                        if (expectArg.type === "MemberExpression"){ // e.g. "items.propname", not "items"
                            var argObj = expectArg.object.name;

                            if (argObj === shouldBeLengthChecked){
                                var argObjProp = expectArg.property.name;
                                if (argObjProp === "length"){
                                    ok = true;
                                }
                            }
                        }
                    }
                }
                if (!ok){
                    failures.push(context.report.bind(null, callee.object,
                        "length check for {{varname}} required before calling forEach on it.",
                        { varname: shouldBeLengthChecked }));
                }
            }
        }
    };
};
