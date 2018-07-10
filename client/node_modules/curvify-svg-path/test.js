var test = require('tape')
var parse = require('parse-svg-path')
var curvify = require('./')

test('lineTo', function (assert) {
  assert.deepEqual(
    curvify(parse('L100 100')),
    parse('C0,0 100,100 100,100')
  )

  assert.deepEqual(
    curvify(parse('L50 50 100 0')),
    parse('C0,0 50,50 50,50 C50,50 100,0 100,0')
  )

  assert.deepEqual(
    curvify(parse('H50 100')),
    parse('C0,0 50,0 50,0 C50,0 100,0 100,0')
  )

  assert.deepEqual(
    curvify(parse('V50 100')),
    parse('C0,0 0,50 0,50 C0,50 0,100 0,100')
  )

  assert.end()
})

test('curveTo', function (assert) {
  assert.deepEqual(
    curvify(parse('M10 150 C10 10 150 10 150 150')),
    parse('M10,150C10,10,150,10,150,150')
  )

  assert.deepEqual(
    curvify(parse('M0 120 Q60 0 120 120')),
    parse('M0,120C40,40,80,40,120,120')
  )

  assert.deepEqual(
    curvify(parse('M10 80 C10 10 75 10 75 80 S150 150 150 80')),
    parse('M10,80C10,10,75,10,75,80C75,150,150,150,150,80')
  )

  assert.deepEqual(
    curvify(parse('M0 60 Q30 0 60 60 T120 60')),
    parse('M0,60C20,20,40,20,60,60C80,100,100,100,120,60')
  )

  assert.deepEqual(
    curvify(parse('M30 30 Q50 50 84 50 S124 73 107 92 T127 122')),
    parse('M30,30C43.33333333333333,43.33333333333333,61.33333333333333,50,84,50C84,50,124,73,107,92C107,92,113.66666666666666,102,127,122')
  )

  assert.end()
})

test('closePath', function (assert) {
  assert.deepEqual(
    curvify(parse('L100 0 100 100Z')),
    parse('C0,0,100,0,100,0C100,0,100,100,100,100C100,100,0,0,0,0')
  )

  assert.end()
})

test('arcTo', function (assert) {
  assert.deepEqual(
    curvify(parse('M10 80 A150 150 0 0 0 150 80')),
    parse('M 10 80C 53.80473794537901 103.1133445143787 106.19526205462094 103.1133445143787 149.99999999999997 80.00000000000003')
  )

  // half circle clockwise
  assert.deepEqual(
    curvify(parse('M10 80 A50 50 0 0 1 150 80')),
    parse('M 10 80C 10 41.340067511844474 41.34006751184445 10.000000000000014 79.99999999999999 10C 118.65993248815552 10 150 41.34006751184445 150 79.99999999999999')
  )

  // half circle anticlockwise
  assert.deepEqual(
    curvify(parse('M10 80 A50 50 0 1 0 150 80')),
    parse('M 10 80C 10.000000000000014 118.65993248815553 41.340067511844474 150 80 150C 118.65993248815553 150 150 118.65993248815553 150 80')
  )

  // circle
  assert.deepEqual(
    curvify(parse('M10 80 A50 50 0 0 1 150 80 A50 50 0 0 1 10 80')),
    parse('M 10 80C 10 41.340067511844474 41.34006751184445 10.000000000000014 79.99999999999999 10C 118.65993248815552 10 150 41.34006751184445 150 79.99999999999999C 150 118.65993248815553 118.65993248815553 150 80 150C 41.340067511844474 150 10.000000000000014 118.65993248815553 10 80.00000000000001')
  )

  assert.deepEqual(
    curvify(parse('M10 80 A150 75 30 0 0 150 80')),
    parse('M 10 80C 72.04149682761658 108.21761044823509 129.85079028483736 108.21761044823509 150 79.99999999999999')
  )

  // the null curve
  assert.deepEqual(
    curvify(parse('M10 80 A50 50 0 0 1 10 80')),
    parse('M10,80')
  )

  assert.end()
})
