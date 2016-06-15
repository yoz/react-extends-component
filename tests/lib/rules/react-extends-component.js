/**
 * @fileoverview Detect potential components that don&#39;t extend React.Component
 * @author Yoyo Zhou
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/react-extends-component"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("react-extends-component", rule, {

  valid: [
    {
      code: "class MyComponent extends React.Component { render() { return <span>My</span>; } }",
      parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: { jsx: true }
      }
    },
    {
      code: "class MyComponent extends AnythingAtAll { render() { return <span>My</span>; } }",
      parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: { jsx: true }
      }
    },
    {
      code: "class Nothing { }",
      parserOptions: {
        ecmaVersion: 6
      }
    }
  ],

  invalid: [
    {
      code: "class MyComponent { render() { return <span>My</span>; } }",
      output: "class MyComponent extends React.Component { render() { return <span>My</span>; } }",
      parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: { jsx: true }
      },
      errors: [{
        message: "Class MyComponent calls render() but does not extend",
        type: "ClassDeclaration"
      }]
    }
  ]
});
