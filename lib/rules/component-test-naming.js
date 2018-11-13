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
    const angularServiceNames = ['controller', 'component'];
    var options = context.options[0];
    const componentModuleDefault = 'e2eComponentTest';
    const componentModule = (options && options.componentModule) ? options.componentModule : componentModuleDefault;

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        'Program:exit': function () {
            failures.forEach(function (failure) {
                failure();
            });
        },

        'CallExpression': function (node) {
            let ok = true;

            let controllerDefinition = node.callee.type === 'MemberExpression' && angularServiceNames.includes(node.callee.property.name) && node.arguments.length;
            let controllerIdentifier = node.arguments[0];
            if (controllerDefinition) {
                if (node.callee.object.type === 'CallExpression') {
                    const moduleCall = node.callee.object;
                    let componentModuleDefinition = moduleCall.arguments.length
                        && moduleCall.arguments[0].value.includes(componentModule)
                        && moduleCall.callee.property.name === 'module';
                    if (componentModuleDefinition) {
                        ok = controllerIdentifier.value.endsWith('Test');
                    }
                }
            }

            if (!ok) {
                failures.push(context.report.bind(context, {
                    node: controllerIdentifier,
                    message: `Controller / Component name must end with 'Test'`
                }));
            }
        }
    };
};
