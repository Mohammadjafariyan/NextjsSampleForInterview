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

describe('POST /category/getSingleByProperty', function () {
  console.log('starting .... ')

  it('POST /category/getSingleByProperty', async function () {
    console.log(
      '--------------------------------------------------------------'
    )
    console.log('category:getSingleByProperty Tests ')
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

    const fail2 = await request(app.server)
      .get('/category/getall')
      // .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(response => {
        console.log(response.body)
        expect(response.body.error).equal('Unauthorized')
      })
      .expect(401)

    const getallresponse = await request(app.server)
      .get('/category/getall')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(response => {}) // Set Authorization header with JWT token

    console.log(getallresponse.body)
    expect(getallresponse.body.status).equal(ResponseStatusType.SUCCESS)
    expect(getallresponse.body.list).to.be.an('array')
    expect(getallresponse.body.list).to.not.be.empty

    let category = getallresponse.body.list[0]

    let getSingleResponse = await request(app.server)
      .get(`/category/getSingleByProperty`)
      .query({ id: category.id })
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(response => {}) // Set Authorization header with JWT token

    console.log('getSingleResponse', getSingleResponse.body)
    expect(getSingleResponse.body.single).to.not.be.null
    expect(getSingleResponse.body.single.id, category.id)
    expect(getSingleResponse.body.single.category, category.category)

    getSingleResponse = await request(app.server)
      .get(`/category/getSingleByProperty`)
      .query({ category: category.category })
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(response => {}) // Set Authorization header with JWT token

    console.log('getSingleResponse', getSingleResponse.body)
    expect(getSingleResponse.body.single).to.not.be.null
    expect(getSingleResponse.body.single.id, category.id)
    expect(getSingleResponse.body.single.category, category.category)

    getSingleResponse = await request(app.server)
      .get(`/category/getSingleByProperty`)
      .query({ category: category.category, id: category.id })
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(response => {}) // Set Authorization header with JWT token

    console.log('getSingleResponse', getSingleResponse.body)
    expect(getSingleResponse.body.single).to.not.be.null
    expect(getSingleResponse.body.single.id, category.id)
    expect(getSingleResponse.body.single.category, category.category)

  })
})
