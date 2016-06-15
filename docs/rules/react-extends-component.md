# Detect potential components that don&#39;t extend React.Component (react-extends-component)

When upgrading from React 0.13 to 0.14, components in ES6 class syntax must extend React.Component, where they did not before.

## Rule Details

This rule warns about ES6 classes that have a `render()` method and do not have a superclass. It is a rough approximation to finding ES6 classes that are React components but do not have React.Component as a parent class.

With `--fix`, it adds `extends React.Component` to the class definition. This may be more verbose than necessary if Component is imported into scope.

The following patterns are considered warnings:

```js
class MyComponent {
  render() {
    return <span>My</span>;
  }
}
```

The following patterns are not warnings:

```js
class MyComponent extends SuperClass {
  render() {
    return <span>My</span>;
  }
}
```

### Options

None.

## When Not To Use It

This rule is only particularly useful for React 0.13 and lower. In newer versions, extending React.Component is mandatory.
