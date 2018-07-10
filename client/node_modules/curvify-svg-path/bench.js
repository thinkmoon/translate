var benchmark = require('benchmark')
var parse = require('parse-svg-path')
var abs = require('abs-svg-path')
var normalize = require('normalize-svg-path')
var curvify = require('./')

var path = abs(parse('M0 0 L10 10 A10 10 0 0 0 20 20 Z'))

benchmark.Suite()
  .add('curvify', setup(curvify))
  .add('normalize', setup(normalize))
  .on('error', error)
  .on('cycle', cycle)
  .run()

function setup (fn) {
  return function () {
    fn(path)
  }
}

function error (e) {
  console.error(e.target.error.stack)
}

function cycle (e) {
  console.log(String(e.target))
}
