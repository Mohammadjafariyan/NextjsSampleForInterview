import { faker, tr } from '@faker-js/faker'
import app from '../../server'
import { registerThenLogin } from '../util/register.login.spec'
import {
  DebugModeSingleton,
  ResponseStatusType
} from '../../src/util/constants'
const request = require('supertest')

/* ----------------------------------- */
/* login api test */
/* ----------------------------------- */

describe('POST /category/delete', function () {
  console.log('starting .... ')

  it('POST /category/delete', async function () {
    console.log(
      '--------------------------------------------------------------'
    )
    console.log('category:create Tests ')
    console.log(
      '--------------------------------------------------------------'
    )

    // for disabling swagger configuration during debug with mocha
    DebugModeSingleton.getInstance().setDebugMode(true)

    const fail = await request(app.server)
      .post('/category/create')
      .send({
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        category: faker.location.city(),
        counter: faker.number.int()
      })
      // .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(response => {
        console.log(response.body)
        expect(response.body.error).equal('Unauthorized')
      })
      .expect(401)

    const token = await registerThenLogin(app)

    const rep = await request(app.server)
      .post('/category/create')
      .send({
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        category: faker.location.city(),
        counter: faker.number.int({ min: 1, max: 999})
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(response => {}) // Set Authorization header with JWT token

    console.log(rep.body)
    expect(rep.body.status).equal(ResponseStatusType.SUCCESS)
    expect(rep.body.id).to.not.be.null

    const deleteResponse = await request(app.server)
      .post('/category/delete')
      .send({
        id:rep.body.id
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(response => {}) // Set Authorization header with JWT token

    console.log(deleteResponse.body)
    expect(deleteResponse.body.status).equal(ResponseStatusType.SUCCESS)



    



    
  })
})
