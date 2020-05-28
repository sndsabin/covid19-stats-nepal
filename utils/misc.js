var getNepaliNumber = function (number) {
  var nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९']
  var result = ''

  number = new Intl.NumberFormat('en-IN').format(number) // add comma

  String(number)
    .split('')
    .forEach(function (character) {
      if (character === '.' || character === ',') {
        result += character
      } else {
        result += nepaliDigits[character]
      }
    })
  return result
}

module.exports = { getNepaliNumber }
