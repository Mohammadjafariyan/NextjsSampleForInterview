import app from '../../server'
const request = require('supertest');




describe('POST /login', function() {
  it('return json response', function() {
    return request(app.server)
    .post('/login')
    .send({
      username:'admin',
      password:'admin'
    })
    .expect(200)
    .expect('Content-Type',/json/)
    .expect(response=>{

      console.log(response.body);
      expect(response.body.message).equal(
        'Login Successful'
    )

    expect(response.body.token).to.not.be.null

    })
  })
})