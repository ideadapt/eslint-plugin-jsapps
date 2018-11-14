# Check for object keys equal to a set of reserved ones (reserved-keys)

This rule preserves you from overwriting keys that might already be in use by another framework in this context.


## Rule Details

Only keys of objects named this and self are inspected.
Using the keywords option you can configure which key names to check against.

The following patterns are considered warnings:

```js
// given that id is configured as reserved word.
this.id = 1;
console.log(this.id);
self.id = 1;
```

The following patterns are not warnings:

```js
// given that only id is configured as reserved word.
this.accountId = 1;
figure.id = 1;
```

### Options

keywords: an array of keywords to check against. default: ["id", "env", "suite", "description", "queue", "afterCallbacks", "startTime", "matchersClass"];

## When Not To Use It

Since this rule should only apply in test files it uses a little trick to detect the actual context. If the file we are in has any expect function call in it, its treated as test file.

For now this rule only works with jasmine or protractor assertion keywords, i.e. expect.
