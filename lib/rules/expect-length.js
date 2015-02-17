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
    var settings = context.settings || /* istanbul ignore next */ {};

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------
    console.log(context);
    console.log(settings);
    // any helper functions should go here or else delete this section

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        "Identifier": function(node){
            console.log(node);
            if (node.name !== "i"){
                context.report(node, "length check required");
            }
        }

    };

};
