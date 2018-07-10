# curvify-svg-path
a rewrite of [normalize-svg-path](https://github.com/jkroso/normalize-svg-path) that does away with [svg-arc-to-cubic-bezier](https://github.com/colinmeinke/svg-arc-to-cubic-bezier)

[![Build status](https://travis-ci.org/michaelrhodes/curvify-svg-path.svg?branch=master)](https://travis-ci.org/michaelrhodes/curvify-svg-path)

## install
```sh
$ npm install michaelrhodes/curvify-svg-path#1.0.0
```

## use
```js
var abs = require('abs-svg-path')
var parse = require('parse-svg-path')
var curvify = require('curvify-svg-path')

curvify(abs(parse('M0 0 L10 10 A10 10 0 0 0 20 20 Z')))
=> [['M',0,0],['C',0,0,10,10,10,10],['C',10,15.5,14.5,20,20,20],['C',20,20,0,0,0,0]]
```

```
curvify x 1,405,052 ops/sec ±0.98% (86 runs sampled)
normalize x 1,261,684 ops/sec ±0.97% (87 runs sampled)
```

## obey
[MIT](http://opensource.org/licenses/MIT)
