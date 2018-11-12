/**
 * @fileoverview If variable items is used like items.forEach, expect its length is tested before.
 * @author Ueli Kunz
 * @copyright 2018 Ueli Kunz. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    // variables should be defined here
    const failures = [];
    const preferES6 = [
        {
            candidates: ['forEach', 'filter', 'isArray', 'map', 'reduce'],
            bad: (id) => id === '_',
            recommended: 'Array'
        },
        {
            candidates: ['includes', 'find'],
            bad: (id) => id !== '_',
            recommended: '_'
        },
        {
            candidates: ['split', 'join'],
            bad: (id) => id === '_',
            recommended: 'String'
        }];

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------
    function findCandidate(name) {
        return preferES6.filter(spec => spec.candidates.includes(name)).pop();
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        'Program:exit': function () {
            failures.forEach(function (failure) {
                failure();
            });
        },

        'MemberExpression': function (node) {
            let ok = true;
            let recommended = '';

            let matchingCandidate = findCandidate(node.property.name);
            const foundMemberCandidate = node.type === 'MemberExpression' && matchingCandidate;

            if (foundMemberCandidate) {
                if (matchingCandidate.bad(node.object.name)) {
                    recommended = `${node.property.name} of ${matchingCandidate.recommended}`;
                    ok = false;
                }
            }

            if (!ok) {
                failures.push(context.report.bind(context, {
                    node: node.object,
                    message: `Use ${recommended} instead.`
                }));
            }
        }
    };
};
