# Require for items.forEach, that items.length is checked. (expect-length)

This rule is designed to improve test code reliability by detecting potentially dead code. It only applies to test files.


## Rule Details

expect-length does its best to ensure, that a forEach callback will at least run once.

The following patterns are considered warnings:

```js

helper.sentences().forEach(function maybe(){
    expect(senctences.getText()).toContain('bug');
});

```

The following patterns are not warnings:

```js

var sentences = helper.sentences();
expect(sentences.length).toBeGreatherThan(0);
sentences.forEach(function someOrNever(){
    expect(senctences.getText()).toContain('bug');
});

```

## When Not To Use It

Since this rule should only apply in test files it uses a little trick to detect the actual context. If the file we are in has any expect function call in it, its treated as test file.

For now this rule only works with jasmine or protractor assertion keywords, i.e. expect.
