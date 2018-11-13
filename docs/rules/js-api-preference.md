# Detect usage of unwanted API usage

Control what functions of what scopes are invalid, and what should be used instead.


## Rule Details

The following patterns are considered warnings:

```js
_.forEach // use Array.prototype.forEach instead
```

### Options

None

## When Not To Use It

You dont have specific API preferences. \
This rule only works when detecting static functions. e.g. _.isEqual can be detected without false positives, "".includes() can not, since [].includes also exists, and there is not reliable and easy way to know the object type.
