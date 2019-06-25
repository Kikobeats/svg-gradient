'use strict'

const GradientParser = require('gradient-parser')

const positionsForOrientation = orientation => {
  let positions = {
    x1: '0%',
    x2: '0%',
    y1: '0%',
    y2: '0%'
  }

  if (orientation.type === 'angular') {
    const anglePI = orientation.value * (Math.PI / 180)
    positions.x1 = Math.round(50 + Math.sin(anglePI + Math.PI) * 50) + '%'
    positions.y1 = Math.round(50 + Math.cos(anglePI) * 50) + '%'
    positions.x2 = Math.round(50 + Math.sin(anglePI) * 50) + '%'
    positions.y2 = Math.round(50 + Math.cos(anglePI + Math.PI) * 50) + '%'
  } else if (orientation.type === 'directional') {
    switch (orientation.value) {
      case 'left':
        positions.x1 = '100%'
        break

      case 'up':
        positions.y1 = '100%'
        break

      case 'right':
        positions.x2 = '100%'
        break

      case 'down':
        positions.y2 = '100%'
        break

      default:
        throw new Error(`Invalid orientation value: ${orientation.value}`)
    }
  }

  return positions
}

module.exports = css => {
  if (!css) return `<linearGradient id='lgrad' />`

  const { orientation, colorStops } = GradientParser.parse(css)[0]
  const { x1, x2, y1, y2 } = positionsForOrientation(orientation)

  const getColorStops = (colorStop, index) => {
    const offset = (index / (colorStops.length - 1)) * 100 + '%'
    let stopColor = 'rgb(0,0,0)'
    let stopOpacity = 1.0

    switch (colorStop.type) {
      case 'rgb': {
        const [r, g, b] = colorStop.value
        stopColor = `rgb(${r},${g},${b})`
        break
      }

      case 'rgba': {
        const [r, g, b, a] = colorStop.value
        stopColor = `rgb(${r},${g},${b})`
        stopOpacity = Number(a)
        break
      }

      case 'hex': {
        stopColor = `#${colorStop.value}`
        break
      }

      case 'literal': {
        stopColor = colorStop.value
        break
      }
    }

    return `<stop offset="${offset}" style="stop-color:${stopColor};stop-opacity:${stopOpacity}" />`
  }

  const linearGradient = `<linearGradient id="lgrad" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${colorStops
    .map(getColorStops)
    .join('')}</linearGradient>`

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" >
      <defs>
      ${linearGradient}
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#lgrad)"/>
    </svg>
    `
}