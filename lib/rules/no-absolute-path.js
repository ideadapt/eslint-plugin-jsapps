/**
 * @fileoverview Do not allow paths like /api/docs, force ./api/docs
 * @author Ueli Kunz
 * @copyright 2014 Ueli Kunz. All rights reserved.
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
    function isAbsolutePath(string){
        return string.charAt(0) === "/";
    }

    function isString(value){
        return typeof value === "string";
    }

    function isConcatenatedRight(node){
        if (node.parent.type === "BinaryExpression" && node.parent.right.value === node.value){
            return true;
        }
        return false;
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        "Literal": function(node){
            if (isConcatenatedRight(node)){
                return;
            }
            if (isString(node.value)){

                if (isAbsolutePath(node.value)){
                    if (node.value.charAt(0) !== "."){
                        context.report(node, "Paths should be relative and therefore start with './'");
                    }
                }
            }
        }
    };

};
