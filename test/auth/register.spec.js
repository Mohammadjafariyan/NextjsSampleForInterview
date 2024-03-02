import app from '../../server'
const request = require('supertest');




describe('POST /register', function() {
  it('return json response', function() {
    return request(app.server)
      .post('/register')
      .send({
        username:'admin',
        password:'admin'
      })
      .expect(200)
      .expect('Content-Type',/json/)
      .expect(response=>{

        console.log(response.body);
        expect(response.body.message).equal(
          'User registered successfully'
      )

      })
  })
})