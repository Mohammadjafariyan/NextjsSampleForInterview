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
describe('POST /category/create', function () {
    console.log('starting .... ');
    it('POST /category/create', async function () {
        console.log('--------------------------------------------------------------');
        console.log('category:create Tests ');
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
        const successResponse = await request(server_1.default.server)
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
        console.log(successResponse.body);
        expect(successResponse.body.status).equal(constants_1.ResponseStatusType.SUCCESS);
    });
});
