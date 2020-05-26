var groupIntoBucket = function (data, attribute) {
  var formattedData = []

  data.forEach(function (item) {
    if (item[attribute] in formattedData) {
      formattedData[item[attribute]].push(item)
    } else {
      formattedData[item[attribute]] = [item]
    }
  })

  return formattedData
}

module.exports = { groupIntoBucket }
