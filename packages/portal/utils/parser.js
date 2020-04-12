export function parseHex(hexColorString) {
  let hexColor = hexColorString.replace(/^#/, '')
  if (hexColor.length === 3) {
    hexColor = hexColor.split('').map(hex => hex + hex).join('')
  }
  return parseInt(hexColor, 16)
}
