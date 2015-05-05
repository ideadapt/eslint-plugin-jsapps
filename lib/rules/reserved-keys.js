/**
 * @fileoverview Check for object keys equal to a set of reserved ones
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
    var options = context.options[0];
    var reservedWordsDefault = ["id", "env", "suite", "description", "queue", "afterCallbacks", "startTime", "matchersClass"];
    var reservedWords = (options && options.keywords) ? options.keywords : reservedWordsDefault;

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        "Program:exit": function(){
            if (inTestFile){
                failures.forEach(function(failure){
                    failure();
                });
            }
        },

        "CallExpression": function(node){
            var callee = node.callee;

            if (callee.type === "Identifier" && callee.name === "expect"){
                inTestFile = true;
            }
        },

        "MemberExpression": function(node){
            var reservedPropertyKey = reservedWords.indexOf(node.property.name) > -1;
            var memberOfThisOrSelf = node.object.type === "ThisExpression" || node.object.name === "self";

            if (reservedPropertyKey && memberOfThisOrSelf){

                failures.push(context.report.bind(null, node,
                    "Property name '{{name}}' is a reserved identifier name. It might be used by another framework in this context.",
                    { name: node.property.name }));
            }
        }

    };

};
