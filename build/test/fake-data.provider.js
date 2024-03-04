"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeNewUser = void 0;
const faker_1 = require("@faker-js/faker");
/* ----------------------------------- */
/* it generates fake data  */
/* ----------------------------------- */
function fakeNewUser() {
    return {
        username: faker_1.faker.internet.userName(),
        password: faker_1.faker.internet.password()
    };
}
exports.fakeNewUser = fakeNewUser;
