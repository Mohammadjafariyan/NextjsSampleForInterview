"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const constants_1 = require("../../src/util/constants");
const hashPassword_1 = require("../../src/util/hashPassword");
const fake_data_provider_1 = require("../fake-data.provider");
const request = require('supertest');
/* ----------------------------------- */
/* 1.register  */
/* 2.login */
/* 3.get profile */
/* ----------------------------------- */
describe('Profile  /profile', function () {
    // for disabling swagger configuration during debug with mocha
    constants_1.DebugModeSingleton.getInstance().setDebugMode(true);
    /* ----------------------------------- */
    /* protection test */
    /* ----------------------------------- */
    it('should return 401 when not authenticated', async () => {
        // Make a request to the protected route without authentication
        const response = await request(server_1.default.server).get('/profile');
        // Verify response status code
        expect(response.status, 401);
    });
    it('Profile  /profile', async function () {
        console.log('--------------------------------------------------------------');
        console.log('profile tests');
        console.log('--------------------------------------------------------------');
        /* -------------------------------------------------------------- */
        /* register */
        /* -------------------------------------------------------------- */
        /* ----------------------------------- */
        /* generate fake data */
        /* ----------------------------------- */
        let user = (0, fake_data_provider_1.fakeNewUser)();
        console.info('.................register.................');
        console.warn('.................register.................');
        console.log(user);
        /* ----------------------------------- */
        /* post request with fake data */
        /* ----------------------------------- */
        let registerResponse = await request(server_1.default.server)
            .post('/register')
            .send({
            username: user.username,
            password: user.password
        })
            .expect(200)
            .expect('Content-Type', /json/);
        console.log(registerResponse.body);
        expect(registerResponse.body.message).equal('User registered successfully');
        /* -------------------------------------------------------------- */
        /* login */
        /* -------------------------------------------------------------- */
        console.info('.................login.................');
        console.warn('.................login.................');
        let loginResponse = await request(server_1.default.server)
            .post('/login')
            .send({
            username: user.username,
            password: user.password
        })
            .expect(200)
            .expect('Content-Type', /json/);
        console.log(loginResponse.body);
        expect(loginResponse.body.message).equal('Login Successful');
        expect(loginResponse.body.token).to.not.be.null;
        const token = loginResponse.body.token;
        /* -------------------------------------------------------------- */
        /* get profile */
        /* -------------------------------------------------------------- */
        console.log('-------------------------');
        console.log('get profile');
        console.log('-------------------------');
        const rep = await request(server_1.default.server)
            .get('/profile')
            .set('Authorization', `Bearer ${token}`); // Set Authorization header with JWT token
        // Verify response status code
        expect(rep.status, 200);
        console.log(rep.status, 200);
        console.log('body:', rep.body);
        console.log('rep.body.profile:' + rep.body.profile);
        // Verify response body contains profile information
        expect(rep.body, 'profile');
        expect(rep.body.profile, 'username'); // Assuming username is included in the profile
        expect(rep.body.profile.username, user.username); // Assuming user123 is the expected username
    });
});
