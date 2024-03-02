import app from '../../server'
import { fakeNewUser } from '../fake-data.provider';
const request = require('supertest');




describe('POST /register', function() {
  it('return json response', function() {


    
    console.log('--------------------------------------------------------------')
    console.log('register tests')
    console.log('--------------------------------------------------------------')

    let user= fakeNewUser();

    return request(app.server)
      .post('/register')
      .send({
        username: user.username,
        password:user.password
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