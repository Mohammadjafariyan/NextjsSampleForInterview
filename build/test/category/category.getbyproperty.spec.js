"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const server_1 = __importDefault(require("../../server"));
const register_login_spec_1 = require("../util/register.login.spec");
const constants_1 = require("../../src/util/constants");
const request = require('supertest');
/* ----------------------------------- */
/* login api test */
/* ----------------------------------- */
describe('POST /category/getSingleByProperty', function () {
    console.log('starting .... ');
    it('POST /category/getSingleByProperty', async function () {
        console.log('--------------------------------------------------------------');
        console.log('category:getSingleByProperty Tests ');
        console.log('--------------------------------------------------------------');
        // for disabling swagger configuration during debug with mocha
        constants_1.DebugModeSingleton.getInstance().setDebugMode(true);
        const fail = await request(server_1.default.server)
            .post('/category/create')
            .send({
            latitude: faker_1.faker.location.latitude(),
            longitude: faker_1.faker.location.longitude(),
            category: faker_1.faker.location.city(),
            counter: faker_1.faker.number.int()
        })
            // .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(response => {
            console.log(response.body);
            expect(response.body.error).equal('Unauthorized');
        })
            .expect(401);
        const token = await (0, register_login_spec_1.registerThenLogin)(server_1.default);
        const rep = await request(server_1.default.server)
            .post('/category/create')
            .send({
            latitude: faker_1.faker.location.latitude(),
            longitude: faker_1.faker.location.longitude(),
            category: faker_1.faker.location.city(),
            counter: faker_1.faker.number.int({ min: 1, max: 999 })
        })
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(response => { }); // Set Authorization header with JWT token
        console.log(rep.body);
        expect(rep.body.status).equal(constants_1.ResponseStatusType.SUCCESS);
        const fail2 = await request(server_1.default.server)
            .get('/category/getall')
            // .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(response => {
            console.log(response.body);
            expect(response.body.error).equal('Unauthorized');
        })
            .expect(401);
        const getallresponse = await request(server_1.default.server)
            .get('/category/getall')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(response => { }); // Set Authorization header with JWT token
        console.log(getallresponse.body);
        expect(getallresponse.body.status).equal(constants_1.ResponseStatusType.SUCCESS);
        expect(getallresponse.body.list).to.be.an('array');
        expect(getallresponse.body.list).to.not.be.empty;
        let category = getallresponse.body.list[0];
        let getSingleResponse = await request(server_1.default.server)
            .get(`/category/getSingleByProperty`)
            .query({ id: category.id })
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(response => { }); // Set Authorization header with JWT token
        console.log('getSingleResponse', getSingleResponse.body);
        expect(getSingleResponse.body.single).to.not.be.null;
        expect(getSingleResponse.body.single.id, category.id);
        expect(getSingleResponse.body.single.category, category.category);
        getSingleResponse = await request(server_1.default.server)
            .get(`/category/getSingleByProperty`)
            .query({ category: category.category })
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(response => { }); // Set Authorization header with JWT token
        console.log('getSingleResponse', getSingleResponse.body);
        expect(getSingleResponse.body.single).to.not.be.null;
        expect(getSingleResponse.body.single.id, category.id);
        expect(getSingleResponse.body.single.category, category.category);
        getSingleResponse = await request(server_1.default.server)
            .get(`/category/getSingleByProperty`)
            .query({ category: category.category, id: category.id })
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(response => { }); // Set Authorization header with JWT token
        console.log('getSingleResponse', getSingleResponse.body);
        expect(getSingleResponse.body.single).to.not.be.null;
        expect(getSingleResponse.body.single.id, category.id);
        expect(getSingleResponse.body.single.category, category.category);
    });
});
