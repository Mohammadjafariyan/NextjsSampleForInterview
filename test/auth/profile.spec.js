import app from '../../server'
import { hashPassword } from '../../src/util/hashPassword'
import { fakeNewUser } from '../fake-data.provider'
const request = require('supertest')




it('hash tests', async () => {
  // Make a request to the protected route without authentication

  
  console.log('--------------------------------------------------------------')
  console.log('hash tests')
  console.log('--------------------------------------------------------------')

  expect(hashPassword("vvsodif*w3&23651"),hashPassword("vvsodif*w3&23651"))
  expect(hashPassword("vvsodif*2378fb&23651"),hashPassword("vvsodif*2378fb&23651"))
  expect(hashPassword("vvso23e4rynm1"),hashPassword("vvso23e4rynm1"))
  // Verify response status code
})



it('should return 401 when not authenticated', async () => {
  // Make a request to the protected route without authentication
  const response = await request(app.server).get('/profile')

  // Verify response status code
  expect(response.status, 401)
})

describe('Profile  /profile', function () {
  it('return json response', async function () {

    console.log('--------------------------------------------------------------')
    console.log('profile tests')
    console.log('--------------------------------------------------------------')

    /* -------------------------------------------------------------- */
    /* register */
    /* -------------------------------------------------------------- */
    let user= fakeNewUser();

    console.info('.................register.................')
    console.warn('.................register.................')

    console.log(user);


    let registerResponse = await request(app.server)
      .post('/register')
      .send({
        username: user.username,
        password: user.password
      })
      .expect(200)
      .expect('Content-Type', /json/)

    console.log(registerResponse.body)
    expect(registerResponse.body.message).equal('User registered successfully')

    /* -------------------------------------------------------------- */
    /* login */
    /* -------------------------------------------------------------- */

    console.info('.................login.................')
    console.warn('.................login.................')
    let loginResponse = await request(app.server)
      .post('/login')
      .send({
        username: user.username,
        password: user.password
      })
      .expect(200)
      .expect('Content-Type', /json/)

    console.log(loginResponse.body)
    expect(loginResponse.body.message).equal('Login Successful')

    expect(loginResponse.body.token).to.not.be.null

    const token = loginResponse.body.token

    /* -------------------------------------------------------------- */
    /* get profile */
    /* -------------------------------------------------------------- */
    console.log('-------------------------')
    console.log('get profile')
    console.log('-------------------------')

    const rep = await request(app.server)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`) // Set Authorization header with JWT token

    // Verify response status code
    expect(rep.status, 200)
    console.log(rep.status, 200)

    console.log('body:', rep.body)
    console.log('rep.body.profile:' + rep.body.profile)
    // Verify response body contains profile information
    expect(rep.body, 'profile')
    expect(rep.body.profile, 'username') // Assuming username is included in the profile
    expect(rep.body.profile.username, user.username) // Assuming user123 is the expected username
  })
})
