var request = require('supertest')
var app = require('../app')

describe('index', function () {
  it('renders the index page', async function (done) {
    request(app)
      .get('/')
      .expect(200)
      .end(function (err, res) {
        if (err) throw err
        expect(res.text).toContain('Covid19 Stats Nepal')
        done()
      })
  })
})
