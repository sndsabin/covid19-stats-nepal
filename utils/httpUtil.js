var axios = require('axios')

var get = function (url, params) {
  // Get Request
  return axios({
    method: 'GET',
    url: url,
    params: params
  })
}

module.exports = { get }
