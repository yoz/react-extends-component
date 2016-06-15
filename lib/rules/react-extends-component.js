/**
 * @fileoverview Detect potential components that don&#39;t extend React.Component
 * @author Yoyo Zhou
 */
"use strict";


// NB. This detects only classes that don't extend anything, in case of
// components extending other components.
module.exports = function(context) {

  var inPossibleComponent = false;

  return {
    ClassDeclaration: function(node) {
      inPossibleComponent = false;
    },
    MethodDefinition: function(node) {
      if (node.key.name === 'render') {
        inPossibleComponent = true;
      }
    },
    "ClassDeclaration:exit": function(node) {
      if (!inPossibleComponent) {
        return;
      }
      if (node.superClass) {
        return;
      }
      if (node) {
        context.report({
          node: node,
          message: 'Class ' + node.id.name  + ' calls render() but does not extend',
          fix: function(fixer) {
            return fixer.insertTextAfter(node.id, ' extends React.Component');
          }
        });
      }
    }
  };
};

module.exports.schema = [
];
