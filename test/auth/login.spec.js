import app from '../../server'
const request = require('supertest')

/* ----------------------------------- */
/* login api test */
/* ----------------------------------- */

describe('POST /login', function () {
  it('return json response', function () {
    console.log(
      '--------------------------------------------------------------'
    )
    console.log('login tests')
    console.log(
      '--------------------------------------------------------------'
    )

    return request(app.server)
      .post('/login')
      .send({
        username: 'admin65156',
        password: 'admi651n'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(response => {
        console.log(response.body)

        /* ----------------------------------- */
        /* it must be failed in this test */
        /* ----------------------------------- */
        expect(response.body.message).equal('Login Failed')

        expect(response.body.token).to.be.null
      })
  })
})
