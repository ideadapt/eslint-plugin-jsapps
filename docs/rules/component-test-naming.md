# Validate controller / component name of component testing module

Make sure component test services, do not override production services


## Rule Details


The following patterns are considered warnings:

```js
angular.module('company.e2eComponentTests.MyComponent').controller('MyComponentController')
// Postfix Test missing in controller name
```

The following patterns are not warnings:

```js
angular.module('ibng.e2eComponentTests.MyComponent').controller('MyComponentControllerTest')
```

### Options

componentModule: substring that has to match in module definition. e.g. 'e2eComponentTests.' 

## When Not To Use It

You do not include any test related services in your (dev) build.
