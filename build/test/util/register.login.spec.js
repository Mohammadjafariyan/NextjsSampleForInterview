"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerThenLogin = void 0;
const fake_data_provider_1 = require("../fake-data.provider");
const request = require('supertest');
async function registerThenLogin(app) {
    /* ----------------------------------- */
    /* generate fake data */
    /* ----------------------------------- */
    let user = (0, fake_data_provider_1.fakeNewUser)();
    console.log(user);
    /* ----------------------------------- */
    /* post request with fake data */
    /* ----------------------------------- */
    let registerResponse = await request(app.server)
        .post('/register')
        .send({
        username: user.username,
        password: user.password
    })
        .expect(200)
        .expect('Content-Type', /json/);
    console.log(registerResponse.body);
    /* -------------------------------------------------------------- */
    /* login */
    /* -------------------------------------------------------------- */
    let loginResponse = await request(app.server)
        .post('/login')
        .send({
        username: user.username,
        password: user.password
    })
        .expect(200)
        .expect('Content-Type', /json/);
    const token = loginResponse.body.token;
    /* -------------------------------------------------------------- */
    /* get profile */
    /* -------------------------------------------------------------- */
    console.log('-------------------------');
    console.log('get profile');
    console.log('-------------------------');
    return token;
}
exports.registerThenLogin = registerThenLogin;
