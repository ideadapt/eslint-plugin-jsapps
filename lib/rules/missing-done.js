/**
 * @fileoverview Report expect usages within a callback, that are not within a spec with a done argument.
 * @author Ueli Kunz
 * @copyright 2016 Ueli Kunz. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
    // variables should be defined here
    var inTestFile = false;
    var failures = [];
    var currentIt = {
        start: null,
        end: null,
        hasDone: null,
        node: null
    };

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    function isWithinACallback(node, outerNode){
        // find closest CallExpression with an argument of type function that builds the lexical scope for given node.
        // do not look beyond outerNode
        var parent = node.parent;
        while (parent != null && parent !== outerNode){
            if (parent.type === "CallExpression" && parent.arguments.length > 0){
                var hasCallbackArg = parent.arguments.filter(function(arg){
                    return arg.type === "ArrowFunctionExpression" || "FunctionExpression";
                }).filter(function(funcArg){
                    return funcArg.start < node.start && funcArg.end > node.end;
                }).length > 0;

                if (hasCallbackArg){
                    return true;
                }
            }
            parent = parent.parent;
        }

        return false;
    }

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

            if (callee.type === "Identifier" && callee.name === "it"){
                currentIt.start = node.start;
                currentIt.end = node.end;
                currentIt.node = node;

                var spec = node.arguments[1];
                currentIt.hasDone = spec && spec.params && spec.params.length === 1;
            }

            if (callee.type === "Identifier" && callee.name === "expect"){
                var isWithinCurrentIt = node.start > currentIt.start && node.end < currentIt.end;
                if (isWithinCurrentIt && currentIt.hasDone === false && isWithinACallback(node, currentIt.node)){
                    failures.push(context.report.bind(context, {
                        node: node,
                        message: "expect statement within callback must be combined with done callback."
                    }));
                }
            }
        }

    };

};
