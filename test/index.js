'use strict'

const test = require('ava')

const svgLinearGradient = require('../src')

const { GradientError } = require('../src')

test('rgba', t => {
  t.snapshot(
    svgLinearGradient(
      'linear-gradient(90deg, rgba(153,218,255,1) 0%, rgba(0,128,128,1) 100%)'
    )
  )
})

test('hex', t => {
  t.snapshot(
    svgLinearGradient(
      'linear-gradient(90deg, rgba(153,218,255,1) 0%, rgba(0,128,128,1) 100%)'
    )
  )
})

test('directional', t => {
  t.snapshot(svgLinearGradient('linear-gradient(to bottom, #4A00E0, #8E2DE2)'))
})

test('throw an error if the gradient is not valid', t => {
  const error = t.throws(() =>
    svgLinearGradient(
      'linear-gradient(to%20right%2C%20%23000046%2C%20%231cb5e0)'
    )
  )

  t.is(error.message, 'Invalid CSS gradient')
  t.truthy(error.cause)
  t.true(error instanceof GradientError)
})
