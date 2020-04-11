export function parseHex(hexColorString) {
  return parseInt(hexColorString.replace(/^#/, ''), 16)
}
