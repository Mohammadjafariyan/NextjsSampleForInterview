import app from '../../server'
import { DebugModeSingleton } from '../../src/util/constants';
import { fakeNewUser } from '../fake-data.provider';
const request = require('supertest');




    /* ----------------------------------- */
    /* register test */
    /* ----------------------------------- */
describe('POST /register', function() {

    // for disabling swagger configuration during debug with mocha
  DebugModeSingleton.getInstance().setDebugMode(true);


  it('POST /register', function() {



    
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