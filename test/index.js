'use strict'

const test = require('ava')

const svgLinearGradient = require('..')

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
