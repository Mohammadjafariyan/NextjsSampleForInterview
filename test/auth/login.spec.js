import app from '../../server'
const request = require('supertest');




describe('POST /login', function() {
  it('return json response', function() {

    
    console.log('--------------------------------------------------------------')
    console.log('login tests')
    console.log('--------------------------------------------------------------')

    return request(app.server)
    .post('/login')
    .send({
      username:'admin65156',
      password:'admi651n'
    })
    .expect(200)
    .expect('Content-Type',/json/)
    .expect(response=>{

      console.log(response.body);
      expect(response.body.message).equal(
        'Login Failed'
    )

    expect(response.body.token).to.be.null

    })
  })
})