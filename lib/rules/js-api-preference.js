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

    const failures = [];
    const specs = [
        {
            candidates: ['forEach', 'filter', 'isArray', 'map', 'reduce'],
            bad: id => id === '_',
            recommended: 'Array'
        },
        {
            candidates: ['includes', 'find'],
            bad: id => id !== '_',
            recommended: '_'
        },
        {
            candidates: [{bad: 'equals', recommended: 'isEqual'}],
            bad: id => id === 'angular',
            recommended: '_'
        },
        {
            candidates: ['split', 'join'],
            bad: id => id === '_',
            recommended: 'String'
        }];

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    function findSpec(name) {
        let candidate;
        const spec = specs.find(spec => {
            candidate = spec.candidates.find(c => (c.bad || c) === name);
            return candidate;
        });
        if (spec && candidate){
            spec.recommendedCall = (candidate.recommended || candidate);
        }
        return spec;
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
            let recommended;
            let candidateSpec = findSpec(node.property.name);
            const foundMemberCandidate = node.type === 'MemberExpression' && candidateSpec;

            if (foundMemberCandidate) {
                if (candidateSpec.bad(node.object.name)) {
                    recommended = `${candidateSpec.recommendedCall} of ${candidateSpec.recommended}`;
                }
            }

            if (recommended) {
                failures.push(context.report.bind(context, {
                    node: node.object,
                    message: `Use ${recommended} instead.`
                }));
            }
        }
    };
};
