"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const constants_1 = require("../../src/util/constants");
const fake_data_provider_1 = require("../fake-data.provider");
const request = require('supertest');
/* ----------------------------------- */
/* register test */
/* ----------------------------------- */
describe('POST /register', function () {
    // for disabling swagger configuration during debug with mocha
    constants_1.DebugModeSingleton.getInstance().setDebugMode(true);
    it('POST /register', function () {
        console.log('--------------------------------------------------------------');
        console.log('register tests');
        console.log('--------------------------------------------------------------');
        let user = (0, fake_data_provider_1.fakeNewUser)();
        return request(server_1.default.server)
            .post('/register')
            .send({
            username: user.username,
            password: user.password
        })
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(response => {
            console.log(response.body);
            expect(response.body.message).equal('User registered successfully');
        });
    });
});
