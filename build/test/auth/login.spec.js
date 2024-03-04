"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const constants_1 = require("../../src/util/constants");
const request = require('supertest');
/* ----------------------------------- */
/* login api test */
/* ----------------------------------- */
describe('POST /login', function () {
    // for disabling swagger configuration during debug with mocha 
    constants_1.DebugModeSingleton.getInstance().setDebugMode(true);
    it('POST /login', function () {
        console.log('--------------------------------------------------------------');
        console.log('login tests');
        console.log('--------------------------------------------------------------');
        return request(server_1.default.server)
            .post('/login')
            .send({
            username: 'admin65156',
            password: 'admi651n'
        })
            .expect('Content-Type', /json/)
            .expect(response => {
            console.log(response.body);
            /* ----------------------------------- */
            /* it must be failed in this test */
            /* ----------------------------------- */
            expect(response.body.message).equal('Login Failed');
            expect(response.body.token).to.be.null;
        })
            .expect(200);
    });
});
describe('POST /login test for validation', function () {
    it('return json response', function () {
        console.log('--------------------------------------------------------------');
        console.log('login validation tests');
        console.log('--------------------------------------------------------------');
        return request(server_1.default.server)
            .post('/login')
            .send({
            username: 'admin65156',
            password: 65145
        })
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(response => {
            console.log(response.body);
            /* ----------------------------------- */
            /* it must be failed in this test */
            /* ----------------------------------- */
            expect(response.body.message).equal('Login Failed');
            expect(response.body.token).to.be.null;
            expect(response.body.validationErrors).to.not.be.null;
        });
    });
});
