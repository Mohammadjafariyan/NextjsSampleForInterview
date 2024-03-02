import app from '../server'
const request = require('supertest')

/* ----------------------------------- */
/* app test*/
/* ----------------------------------- */
describe('GET /', function () {
  it('return json response', function () {
    return request(app.server)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect('{"hello":"world!!! thanks God"}')
  })
})
