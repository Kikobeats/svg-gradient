'use strict'

const test = require('ava')
const pretty = require('pretty')

const prettyHtml = html => pretty(html, { ocd: true })

const svgLinearGradient = require('..')

test('rgba', t => {
  const svg = prettyHtml(
    svgLinearGradient(
      'linear-gradient(90deg, rgba(153,218,255,1) 0%, rgba(0,128,128,1) 100%)'
    )
  )
  t.deepEqual(
    svg,
    prettyHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="200px" height="200px">
    <defs>
      <linearGradient id="lgrad" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" style="stop-color:rgb(153,218,255);stop-opacity:1" />
        <stop offset="100%" style="stop-color:rgb(0,128,128);stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#lgrad)" />
  </svg>`)
  )
})

test('hex', t => {
  const svg = prettyHtml(
    svgLinearGradient(
      'linear-gradient(90deg, rgba(153,218,255,1) 0%, rgba(0,128,128,1) 100%)'
    )
  )
  t.deepEqual(
    svg,
    prettyHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="200px" height="200px">
    <defs>
      <linearGradient id="lgrad" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" style="stop-color:rgb(153,218,255);stop-opacity:1" />
        <stop offset="100%" style="stop-color:rgb(0,128,128);stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#lgrad)" />
  </svg>`)
  )
})
